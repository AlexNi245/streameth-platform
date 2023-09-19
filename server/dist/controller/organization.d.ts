import Organization, { IOrganization } from "../model/organization";
export default class OrganizationController {
    private controller;
    constructor();
    getOrganization(organizationId: IOrganization["id"]): Promise<Organization>;
    createOrganization(organization: Omit<IOrganization, "id">): Promise<Organization>;
    getAllOrganizations(): Promise<Organization[]>;
}
