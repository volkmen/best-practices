import React from 'react';

export interface Option {
  label: React.ReactNode;
  searchValue?: string;
  value: string | number;
  onClick?: () => void;
}
