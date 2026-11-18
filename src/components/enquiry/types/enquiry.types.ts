export interface EnquiryFormData {
  name: string;
  email: string;
  mobile: string;
  project: string;
  city: string;
  budget: string;
}

export interface EnquiryModalProps {
  open: boolean;
  onClose: () => void;
  projectId?: number | null;
  projectName?: string;
  projectMinPrice?: string | null;
}

export interface EnquiryResponse {
  message: string;
  success: boolean;
}