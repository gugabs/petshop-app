import { ReactElement } from 'react';

export interface IServiceData {
  serviceName: string;
}

export interface IServiceOption extends IServiceData {
  serviceIcon: ReactElement;
  status: {
    isSelected: boolean;
  };
  handlers?: {
    selectService: Function;
  };
}

export interface ICreateScheduleFormControl {
  ownerName: string;
  datetime: string;
  petName: string;
}
