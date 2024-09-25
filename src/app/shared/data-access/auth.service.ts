import {computed, inject, Injectable, Optional, signal, SkipSelf} from '@angular/core';
import {IUser} from "../interfaces/user.interface";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LocalStorage} from "../storages/local-storage";
import {environment} from "../../../environments/environment";
import {ICredentials} from "../interfaces/credentials.interface";
import {BehaviorSubject, catchError, Observable, tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

const USER_KEY = 'auth-user';
export type AuthUser = IUser | null | undefined;

export interface AuthState {
  user: AuthUser;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #http = inject(HttpClient);
  //  #localStorageInjector = inject(LocalStorage);
  // source
  #user$ = new BehaviorSubject(null);
  // state
  #authState = signal<AuthState>({
    user: undefined,
  });
  // selectors
  user = computed(() => this.#authState.asReadonly()().user);

  private readonly api = `${environment.BASE_URL}`;

  constructor(@Optional() @SkipSelf() authService?: AuthService) {
    if (authService) {
      throw new Error('AuthService is already loaded and it should be singleton');
    }
    this.#user$.pipe(takeUntilDestroyed()).subscribe((user) =>
      this.#authState.update((state) => ({
        ...state,
        user,
      }))
    );
  }

  createAccount(credentials: ICredentials): Observable<any> {
    return this.#http
      .post(`${this.api}/signup`, {
        email: credentials.email,
        password: credentials.password,
      }, httpOptions)
      .pipe(tap((user: any) => {
        this.#user$.next(user);
      }));
  }

  // login(credentials: ICredentials): Observable<any> {}
  // logout(): void {}
  // getLocalUser(): Observable<IUser> {}
  // removeLocalUser(): void {}
}
