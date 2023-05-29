Typescript version used -> 5.0.4 but anything greater than 4.7 should work

updated -- 29/05/2023
I created these examples after watching Christian Woerz's talk "Deep Dive into Advanced Typescript: A Live Coding Expedition" held at NDC Oslo 24th of May 2023.  In his talk, Woerz showed various typescript features including mapped types, conditional types, template literals, and more. However, while inspired by Woerz's talk none of the examples are taken directly from there. Thus, when made public I recommend taking a look at his talk. 

## Mapped types
A mapped type is a type with properties created from another type's properties.
https://www.typescriptlang.org/docs/handbook/2/mapped-types.html

We can, for example, define the type 'AccountSetter' based on the existing type 'Account'.

```
type Account = {
    readonly accountHolder: string;
    readonly balance: number;
};

type AccountSetter = {
    [key in keyof Account as `set${Capitalize<key>}`]: (x: Account[key]) => void;
};

//^?
type AccountSetter = {
    readonly setAccountHolder = (x: string) => void;
    readonly setBalance = (x: number) => void;
}
```
We can also create a mapped type from an index signature: [key: string]: string. But this comes with the drawback of not being able to use template literals to constrain the keys' names.

```
type AccountMetaData = {
    [key: string]: string;
}
```

## Conditional types
The syntax for a conditional type is 'SomeType extends OtherType ? TrueType : FalseType'

```
type PaymentResult<T extends 'success' | 'error'> = T extends 'success'
    ? { success: true; data: Payment }
    : { success: false; error: Error }
```

If the payment was a success we return the shape after ? else we return the shape after :.

### The infer keyword
We can use the infer keyword to infer the inner type of an outer type, for example defining User from a list of users.

```
type User = typeof users extends (infer Item)[] ? Item: never;
```

There is still much more we can do with the infer keyword. For those interested:

https://www.typescriptlang.org/docs/handbook/2/conditional-types.html 
    - Basic use and ReturnType
    
https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-7.html
    - Place extends constraints on infer - FirstIfString<T>
    
https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-8.html
    - Constrained infer in template string type 

## Branded types
Type branding or branded types is a way of implementing nominal typing in typescript. With nominal typing, the uniqueness of a type depends on its name. Typescript, however, has a structural type system. If two shapes are the same, then they have the same type.

Nominal typing is less flexible than structural typing; it is, however, useful when we have structurally equivalent types that must be handled differently. Ie. objects with similar properties but different business meanings.

```
type Invoice = { id: string,
    customer: string,
    amount: PositiveNumber,
    date: string
    items: string[],
    discount: number,
} & { __brand: 'invoice' }

type Receipt = {
    id: string,
    customer: string,
    amount: PositiveNumber,
    date: string,
    items: string[],
    discount: number,
} & { __brand: 'receipt' }
```
By branding Invoice and Receipt objects, we will get typescript errors if an invoice is treated as a receipt and vice versa.

```
function sendReceipt(receipt: Receipt) {
    console.log('Receipt is sent.', receipt)
}

sendReceipt(invoice) --> ts error
```
