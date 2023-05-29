/**
 * The syntax for a conditional type is 'SomeType extends OtherType ? TrueType : FalseType'
 * */

type Payment = {
    id: string;
    toAccountId: string;
    fromAccountId: string;
    amount: number;
}

// By using extends to constrict T we provide typescript with the extra information 
// that T must either be 'success' or 'error' and which we can use on the right 
// hand side of the equation.
type PaymentResult<T extends 'success' | 'error'> = T extends 'success'
    ? { success: true; data: Payment }
    : { success: false; error: Error }

const payment: Payment = {
    id: '84c66025-ddd0-4073-bc10-1d0fcdbc8c7a',
    toAccountId: 'ebd85561-5c8d-43ba-861c-1c9a612f4b90',
    fromAccountId: '888daf90-e5f2-42de-89c3-c41480f8d8b4',
    amount: 200
}

function makePayement(payment: Payment) {
    const successResult: PaymentResult<'success'> = {
        success: true,
        data: payment
    }

    const errorResult: PaymentResult<'error'> = {
        success: false,
        error: new Error('Payement Failed!')
    }

    const results = [successResult, errorResult];
    return results[Math.round(Math.random())];
}

const result = makePayement(payment);
console.log(result.success)

/**
 * Inference - using infer to extract a nested type.
 */
const users = [{
    id: "1",
    name: "Bob May",
    age: 29
}, {
    id: "2",
    name: "Mary May",
    age: 28
}]

// We infer the user type from the list of users using conditional typing and infer.
// We state that the type of users always extends Item[] and that Item is User.
type User = typeof users extends (infer Item)[] ? Item: never;
