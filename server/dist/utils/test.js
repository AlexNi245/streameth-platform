"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const organization_1 = require("../controller/organization");
const event_1 = require("../controller/event");
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    const Organization = {
        name: 'Funding the Commons',
        description: 'We are individuals and organizations building new models of sustainable public goods funding and value alignment in open source networks. Our goal with Funding the Commons is to bridge the public goods community across Web2, Web3, research, philanthropy and industry.',
        url: 'https://fundingthecommons.io/',
        logo: 'https://fundingthecommons.io/assets/logoNav.6b3e7427.png',
        location: 'Unknown',
    };
    const orgController = new organization_1.OrganizationController();
    const organizationInstance = yield orgController.createOrganization(Organization);
    const Event = {
        name: 'Funding the Commons Berlin 2023',
        description: 'We are individuals and organizations building new models of sustainable public goods funding and value alignment in open source networks. Our goal with Funding the Commons is to bridge the public goods community across Web2, Web3, research, philanthropy and industry. We do this by convening builders and practitioners, researchers and academics, and funders and philanthropists, catalyzing innovation in public goods. In the future, we seek to expand our impact by facilitating the creation of a public goods fund tied to impact evaluators, seeding projects that are conceived and incubated by the Funding the Commons community.',
        start: new Date('2023-09-09T00:00:00.000Z'),
        end: new Date('2023-09-09T00:00:00.000Z'),
        location: 'Berlin, Germany',
        organizationId: 'funding_the_commons',
        dataImporter: [
            {
                type: 'gsheet',
                config: {
                    sheetId: '1CuefhHHDbdWH77JGnkPQODdaq880mUAhwLlOeYnwWpo',
                    apiKey: 'w',
                },
            },
        ],
        timezone: "Europe/Berlin"
    };
    const eventController = new event_1.EventController();
    const EventInstance = yield eventController.createEvent(Event);
    yield eventController.importEventData(EventInstance);
});
run();
