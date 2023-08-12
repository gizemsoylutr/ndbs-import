const cds = require("@sap/cds");

module.exports = cds.service.impl(async function () {
    this.on('READ', "Personnels", async (req, rej) => {
        const bupa = await cds.connect.to("API_BUSINESS_PARTNER_SRV");
        const { A_BusinessPartner } = bupa.entities;
        let aData = await bupa.run(
            SELECT.from(A_BusinessPartner, (bupa) => {
              bupa('BusinessPartner, Supplier');
              bupa.to_BusinessPartnerAddress((item) => {
                item('CityName');
              });
            })
          );
        aData.forEach(item => {
            const address = item.to_BusinessPartnerAddress[0];
              const Items = {
                "businessPartner": item.BusinessPartner,
                "supplier": item.Supplier,
                "address": address
              };
              aData.push(Items);
            });

            return aData;
          });
});

