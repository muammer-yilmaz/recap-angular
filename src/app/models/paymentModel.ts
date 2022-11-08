import { CreditCardModel } from "./creditCardModel";
import { RentalModel } from "./rentalModel";

export interface PaymentModel extends CreditCardModel, RentalModel {
    // card: CreditCardModel,
    // rental: RentalModel
}