export type SizeInfo = {
  size: string;
  lotNumber: string;
};

export type Product = {
  id: string;
  name: string;
  imageUrl: string;
  sizes: SizeInfo[];
}; 