import { supabase } from "@/supabase";
import { Contact } from "../../interfaces/contact";

export const sendContactInfo = async (contact: Contact) => {
  const { data, error } = await supabase
    .from("contact_info")
    .insert({
      company_name: contact.companyName,
      trade_name: contact.brandName,
      ruc: contact.ruc,
      facility_type: contact.establishmentType,
      food_category: contact.foodType,
      address: contact.address,
      phone: contact.phone,
      email_address: contact.email,
      contact_name: contact.contactName,
      contact_last_name: contact.contactLastName,
      identity_card: contact.contactId,
      contact_position: contact.contactPosition,
      contact_phone: contact.contactPhone,
      contact_email: contact.contactEmail,
    })
    .select();

  if (error) {
    throw error;
  }

  const contactSaved: Contact = data[0];

  return contactSaved;
};
