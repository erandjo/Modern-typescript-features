/**
 * Type branding or branded types is a way of implementing nominal typing in 
 * typescript. With nominal typing, the uniqueness of a type depends on its name. 
 * Typescript, however, has a structural type system. If two shapes are the same, 
 * then they have the same type.
 * 
 * Nominal typing is less flexible than structural typing; it is, however, useful when 
 * we have structurally equivalent types that must be handled differently. Ie. objects 
 * with similar properties but different business meanings.
 * 
 * In this example, we use branded typing to differentiate an Invoice from a receipt. 
 * We also use branded typing to ensure that any amount must be positive. But remember 
 * that typescript is only a compile-time check and that it doesn't give any guarantee 
 * that the amount is positive at runtime. 
 */

// I picked up this trick from:
// (Anderson. J - 12.04.22)
// https://dev.to/hateablestream/typescript-tip-safer-functions-with-branded-types-14o4
type PositiveNumber = number & { __type: 'PositiveNumber' }

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

const reciept: Receipt = {
    id: 'c3d8c985-97ef-4e0b-8970-788d0a7e3e0d',
    customer: "Bob May",
    amount: GuardPositiveNumber(205),
    date: "22092023",
    items: ["5", "17"],
    discount: 0,
    __brand: 'receipt'
}

const invoice: Invoice = {
    id: 'c3d8c985-97ef-4e0b-8970-788d0a7e3e0d',
    customer: "Bob May",
    amount: GuardPositiveNumber(205),
    date: "22092023",
    items: ["5", "17"],
    discount: 0,
    __brand: 'invoice'
}

function GuardPositiveNumber(value: number): PositiveNumber {
    if (value < 0) {
        throw new Error('Amount must be a positive number.');
    }
    return value as PositiveNumber
}

function sendReceipt(receipt: Receipt) {
    console.log('Receipt is sent.', receipt)
}

function sendInvoice(invoice: Invoice) {
    console.log('Invoice is sent.', invoice)
}

// Without branding receipt and invoice, we could have sent the invoice as
// a receipt and vice versa.
sendReceipt(reciept)
sendInvoice(invoice)
