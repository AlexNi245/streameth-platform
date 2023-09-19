export interface IOrganization {
    id: string;
    name: string;
    description: string;
    url: string;
    logo: string;
    location: string;
}
export default class Organization {
    id: string;
    name: string;
    description: string;
    url: string;
    logo: string;
    location: string;
    constructor({ name, description, url, logo, location, }: Omit<IOrganization, "id"> & {
        id?: string;
    });
    validateThis(): Promise<void>;
    toJson(): Promise<string>;
    static fromJson(jsonData: string): Promise<Organization>;
    static getOrganizationPath(id?: string): Promise<string>;
}
