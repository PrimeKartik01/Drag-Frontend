import api from "@/api/axios";

import type {
  EnquiryFormData,
  EnquiryResponse,
} from "../types/enquiry.types";

export const submitEnquiry = async (
  data: EnquiryFormData,
): Promise<EnquiryResponse> => {
  const response = await api.post<EnquiryResponse>("/enquiries", data);
  return response.data;
};
