export type UserCredential = {
    token: string | null;
    refreshToken: string | null;
    accountId: string | null;
    userId: string | null;
    email: string | null;
    displayName: string | null;
    jobTitle: string | null;
    companyName: string | null;
    department: string | null;
    officeLocation: string | null;
}

export type TokenBinus = {
    token: string | null;
    duration: number | null;
};

export type TokenBinusResponse = {
    tokenData: TokenBinus;
    resultCode: number;
    errorMessage: string;
};

export type TokenMicrosoft = {
    code: string,
    state: string,
    sessionState: string,
}