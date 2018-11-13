import { Directive } from "@angular/core";
import {
	Validator,
	AbstractControl,
	ValidationErrors,
	NG_VALIDATORS,
	ValidatorFn
} from "@angular/forms";
import { Subscription } from "rxjs";

export function passValidator(controlNameToCompare: string): ValidatorFn {
	return (c: AbstractControl): ValidationErrors | null => {
		if (c.value === null || c.value.length === 0) {
			return null;
		}

		const controlToCompare = c.root.get(controlNameToCompare);
		if (controlToCompare) {
			const subscription: Subscription = controlToCompare.valueChanges.subscribe(
				() => {
					c.updateValueAndValidity();
					subscription.unsubscribe();
				}
			);
		}
		return controlToCompare && controlToCompare.value !== c.value
			? { passValidator: true }
			: null;
	};
}

@Directive({
	selector: "[appPassValidator]"
})
export class PassValidatorDirective {
	constructor() {}
}
