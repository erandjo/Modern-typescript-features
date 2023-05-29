/**
 * A mapped type is a type with properties created from another type's properties.
 * https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
 *
 * In this example we define the type 'AccountSetter' based on the existing
 * type 'Account'.
 * */

type Account = {
    readonly accountHolder: string;
    readonly balance: number;
};

// using 'as' in [] is called keyRemapping and it allows us to change the key when 
// creating the new type.
// in the keyRemapping we rename the key to be prefixed with set
type AccountSetter = {
    [key in keyof Account as `set${Capitalize<key>}`]: (x: Account[key]) => void;
};

function createAccount(
    name: string,
    balance: number = 0
): {
    account: Account;
    setter: AccountSetter;
} {
    const account = {
        accountHolder: name,
        balance,
    };

    const setter = {
        setAccountHolder: function(name: string) {
            account.accountHolder = name;
        },
        setBalance: function(balance: number) {
            account.balance = balance;
        },
    };

    return { account, setter };
}

const { account, setter } = createAccount("Marry May");

setter.setBalance(30);

console.log(`${account.accountHolder}'s current balance: ${account.balance}`); // prints 30

/**
 * The typescript documentation states that "Mapped types build on the syntax for
 * index signatures, which are used to declare the types of properties which have
 * not been declared ahead of time". An index signature has the following syntax:
 * [key: string]: <type>.
 * https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
 *
 * Only the types string, number, symbol, template string patterns and union types
 * consisting of these are allowed as index types.
 * https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures
 *
 * However, as stated later in the documentation on mapped types, a mapped type
 * does not need to have an index signature; we have seen
 * this in the earlier example.
 * */

// A simple example of a mapped type with an index signature
type AccountMetaData = {
    [key: string]: string;
};

const meta: AccountMetaData = {
    created: "10.10.23",
    latestAccess: "10.10.23",
};
