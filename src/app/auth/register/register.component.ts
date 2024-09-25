import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
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

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatProgressSpinnerModule, MatInputModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterComponent {
  // @Output() register = new EventEmitter<ICredentials>();
  register$: BehaviorSubject<ICredentials | null> = new BehaviorSubject(null as ICredentials | null);
  private fb: FormBuilder = inject(FormBuilder);

  registerForm = this.fb.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
    confirmPassword: ['', [Validators.required]],
  }, {
    updateOn: 'blur', validators: [passwordMatchesValidator],
  });

  onSubmit() {
    if (this.registerForm.valid) {
      const {confirmPassword, ...credentials} = this.registerForm.getRawValue();
      this.register$.next(credentials);
    }
  }
}
