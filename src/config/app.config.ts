interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Lottery Manager'],
  customerRoles: ['Customer'],
  tenantRoles: ['Business Owner', 'Team Member', 'Lottery Manager'],
  tenantName: 'Vendor',
  applicationName: 'Online Lottery System',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'Read lottery information',
    'Purchase lottery tickets',
    'Update personal information',
    'View vendor information',
  ],
  ownerAbilities: ['Manage lottery', 'Manage tickets', 'View user information', 'View vendor information'],
  getQuoteUrl: 'https://roq-wizzard-git-qa03-roqtech.vercel.app/proposal/c4dd7371-4b20-4ee1-b3a8-bb18b1a212db',
};
