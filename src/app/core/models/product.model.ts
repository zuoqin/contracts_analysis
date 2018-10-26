export interface ProductSearch {
    name: string,
    spgz_id: number[];
    kpgz_id: number;
    risk: string;
    region_id: number[];
    delivery_from: string;
    delivery_to: string;
    volume_from: string;
    volume_to: string;
    unit_id: number;
    unit_text: string;
    selectedFromCategory?:boolean;
  }