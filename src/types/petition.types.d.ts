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

type Category = {
    "categoryId": number,
    "name" : string
}