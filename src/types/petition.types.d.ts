type Petitions = {

    "petitionId": number,
    "title": string ,
    "categoryId": number,
    "ownerId": number,
    "ownerFirstName": string,
    "ownerLastName": string,
    "numberOfSupporters": number,
    "creationDate": string,
    "supportingCost": number
}

type Petition = {
    "petitionId": number,
    "title": string,
    "categoryId": number,
    "ownerId": number,
    "ownerFirstName": string,
    "ownerLastName": string,
    "numberOfSupporters": number,
    "creationDate": string,
    "description": string,
    "moneyRaised": number,
    "supportTiers": supportTiers[]
}

type Category = {
    "categoryId": number,
    "name" : string
}