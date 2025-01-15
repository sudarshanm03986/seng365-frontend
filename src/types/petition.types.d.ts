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

type addPetiton = {
    "title": string,
    "description": string,
    "categoryId": number,
    "supportTiers" : newSupportTiers[]
}

type editPetiton = {
    "title": string,
    "description": string,
    "categoryId": number,
}


type Category = {
    "id": number,
    "name" : string
}