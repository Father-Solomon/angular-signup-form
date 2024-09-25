import {ChangeDetectionStrategy, Component, inject, signal, WritableSignal} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {passwordMatchesValidator} from "./utils/password-matches";
import {BehaviorSubject} from "rxjs";
import {ICredentials} from "../../shared/interfaces/credentials.interface";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {RegisterService} from "./services/register.service";
import {AsyncPipe} from "@angular/common";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatProgressSpinnerModule, MatInputModule, AsyncPipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterComponent {
  // @Output() register = new EventEmitter<ICredentials>();
  #registerSrv = inject(RegisterService);
  public $status = this.#registerSrv.status;
  public $passwordNotMatch: WritableSignal<boolean> = signal(false);

  register$: BehaviorSubject<ICredentials | null> = new BehaviorSubject(null as ICredentials | null);
  private fb: FormBuilder = inject(FormBuilder);

  registerForm = this.fb.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
    confirmPassword: ['', [Validators.required]],
  }, {
    updateOn: 'blur', validators: [passwordMatchesValidator],
  });

  constructor() {
   this.registerForm.valueChanges.pipe(takeUntilDestroyed()).subscribe(val => {
     this.$passwordNotMatch.set(this.registerForm.hasError('passwordMatch'));
     // if(this.registerForm.hasError('passwordMatch'))
     console.log('valueChanges:', val)
     console.log('errors:', this.registerForm.errors)
     console.log('hasError passwordMatch:', this.registerForm.hasError('passwordMatch'))
   })

  }


  onSubmit() {
    console.log(this.registerForm.getRawValue())
    console.log(this.registerForm.errors)
    console.log(this.registerForm.valid)
    if (this.registerForm.valid) {
      const {confirmPassword, ...credentials} = this.registerForm.getRawValue();
      this.register$.next(credentials);
      console.log(this.registerForm.getRawValue())
    }
  }

  resetDefaultValueForm()  {
    this.registerForm.reset();
    console.log(this.registerForm.getRawValue())
  }
}
