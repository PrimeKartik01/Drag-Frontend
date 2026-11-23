import api from "@/api/axios";

import type {
  EnquiryFormData,
  EnquiryResponse,
} from "../types/enquiry.types";

export const submitEnquiry = async (
  data: EnquiryFormData,
): Promise<EnquiryResponse> => {
  const response = await api.post<EnquiryResponse>(
    "https://ssprimecrm.com/api/v1/enquiries",
    data,
  );

  return response.data;
};