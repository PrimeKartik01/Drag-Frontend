export interface Project {
  id: number;
  name: string;
  slug: string;

  short_description: string | null;
  description: string | null;

  project_status: string | null;
  bhk: string | null;
  rera_no: string;

  launch_date: string | null;
  possession_date: string | null;

  status: boolean;

  min_price: string | null;
  max_price: string | null;

  area: string | null;
  zip_postal: string | null;

  latitude: string | null;
  longitude: string | null;

  address: string | null;

  featured_image: string | null;

  builder: Builder | null;
  city: City | null;
  state: State | null;
  township: Township | null;
  property_category: PropertyCategory | null;
  property_type: PropertyType | null;
  
  media: ProjectMedia;
}

export interface Builder {
  id: number;
  name: string;
  logo: string | null;
}

export interface City {
  id: number;
  name: string;
  slug: string;
}

export interface State {
  id: number;
  name: string;
}

export interface Township {
  id: number;
  name: string;
}

export interface PropertyCategory {
  id: number;
  name: string;
  slug: string;
}

export interface PropertyType {
  id: number;
  name: string;
}

export interface ProjectsResponse {
  data: Project[];
  success: boolean;
  message: string;
}

export interface ProjectMedia {
  photos: [];
  videos: [];
  floor_plans: [];
  amenities: [];
}