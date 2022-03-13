import { FormEvent, ReactElement, useEffect, useState } from 'react';
import { LinksFunction, LoaderFunction, useLoaderData, useNavigate } from 'remix';

import { useSnackbar } from 'notistack';

import ptBR from 'date-fns/locale/pt-BR';

import { ICreateScheduleFormControl, IServiceData, IServiceOption } from '~/compiler/types';

import api from '~/services/api';

import globalStyle from '~/styles/index.css';
import componentStyle from '~/styles/createSchedule/index.css';

import ServiceOption, {
  links as serviceOptionLinks,
} from '~/components/createSchedule/ServiceOption/index';

import {
  ImageDropzone,
  links as dropzoneLinks,
} from '~/components/createSchedule/ImageDropzone/index';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import { DateTimePicker, LocalizationProvider } from '@mui/lab';

import { FaCut, FaShower, FaTaxi } from 'react-icons/fa';

import { snackBarErrorConfig } from '~/utils/notistack';
import { dateTimePickerStyle } from '~/utils/mui';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: globalStyle,
    },
    {
      rel: 'stylesheet',
      href: componentStyle,
    },
    ...serviceOptionLinks(),
    ...dropzoneLinks(),
  ];
};

export const loader: LoaderFunction = (): IServiceData[] => {
  return [
    {
      serviceName: 'Banho',
    },
    {
      serviceName: 'Tosa',
    },
    {
      serviceName: 'Pet Taxi',
    },
  ];
};

export default function CreateSchedule() {
  const [formData, setFormData] = useState<ICreateScheduleFormControl>({
    ownerName: '',
    datetime: '',
    petName: '',
  });

  function formHandler(key: string, value: string): void {
    setFormData({ ...formData, [key]: value });
  }

  const [dateTime, setDateTime] = useState<Date | null>(null);

  function selectDateTime(dateTime: Date | null): void {
    setDateTime(dateTime);

    if (dateTime) formHandler('datetime', dateTime.getTime().toString());
  }

  const [serviceOptions, setServiceOptions] = useState<IServiceOption[]>();

  function selectService(selectedServiceOption: IServiceOption): void {
    serviceOptions!.forEach((option: IServiceOption) => (option.status.isSelected = false));
    selectedServiceOption.status.isSelected = true;

    setServiceOptions([...serviceOptions!]);
  }

  const services: IServiceData[] = useLoaderData();

  useEffect(() => {
    const serviceIcons: ReactElement[] = [
      <FaShower key={'icon-banho'} />,
      <FaCut key={'icon-tosa'} />,
      <FaTaxi key={'icon-pet-taxi'} />,
    ];

    const availableServiceOption: IServiceOption[] = services.map((service: IServiceData, i) => {
      const serviceOption: IServiceOption = {
        serviceName: service.serviceName,
        serviceIcon: serviceIcons[i],
        status: {
          isSelected: false,
        },
      };

      return serviceOption;
    });

    setServiceOptions(availableServiceOption);
  }, [services]);

  const [selectedImage, setSelectedImage] = useState<File>();

  function onImageUpload(image: File) {
    setSelectedImage(image);
  }

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const selectedServiceOption = serviceOptions!.find(
      (serviceOption) => serviceOption.status.isSelected
    );

    if (!selectedServiceOption) {
      enqueueSnackbar('Selecione um serviço', snackBarErrorConfig);
      return;
    }

    const serviceName: string = selectedServiceOption.serviceName;

    const naturalFieldNames: ICreateScheduleFormControl = {
      ownerName: 'Nome do Cliente',
      datetime: 'Data e Hora do Agendamento',
      petName: 'Nome do Pet',
    };

    const fieldKeys = Object.keys(naturalFieldNames);

    for (let fieldKey of fieldKeys) {
      if (!formData[fieldKey as keyof ICreateScheduleFormControl]) {
        enqueueSnackbar(
          `Preencha o campo: ${naturalFieldNames[fieldKey as keyof ICreateScheduleFormControl]}`,
          snackBarErrorConfig
        );

        return;
      }
    }

    if (!selectedImage) {
      enqueueSnackbar('Selecione uma imagem', snackBarErrorConfig);
      return;
    }

    const petImage: File = selectedImage;

    const form = new FormData();

    form.append('serviceName', serviceName);
    form.append('ownerName', formData.ownerName);
    form.append('datetime', formData.datetime);
    form.append('petName', formData.petName);
    form.append('petImage', petImage);

    api
      .post('/petshop/schedule', form)
      .then(() => {
        enqueueSnackbar('Agendamento cadastrado!');
        navigate('/');
      })
      .catch((err) => {
        enqueueSnackbar('O agendamento não foi realizado', snackBarErrorConfig);
      });
  }

  return (
    <div className="container">
      <header>
        <h1 className="page-title">Faça o seu agendamento {}</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Qual serviço você gostaria de agendar?</label>
          <div className="service-options">
            {serviceOptions &&
              serviceOptions.map((serviceOption, i) => (
                <ServiceOption key={i} {...serviceOption} handlers={{ selectService }} />
              ))}
          </div>
        </div>

        <div className="field">
          <label htmlFor="ownerName">Qual é o seu nome?</label>
          <input
            name="ownerName"
            type={'text'}
            placeholder={'Digite o seu nome'}
            spellCheck={false}
            autoComplete={'off'}
            onChange={(e) => {
              formHandler('ownerName', e.target.value);
            }}
          ></input>
        </div>

        <div className="field">
          <label htmlFor="datetime">Para quando você deseja agendar o nosso serviço?</label>
          <LocalizationProvider locale={ptBR} dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => (
                <TextField
                  {...props}
                  inputProps={{
                    ...props.inputProps,
                    placeholder: 'Selecione o dia e horário',
                  }}
                  name={'datetime'}
                  spellCheck={false}
                  autoComplete={'off'}
                  sx={dateTimePickerStyle}
                />
              )}
              value={dateTime}
              onChange={(newDateTime: Date | null) => {
                if (newDateTime instanceof Date) selectDateTime(newDateTime);
              }}
            />
          </LocalizationProvider>
        </div>

        <div className="field">
          <label htmlFor="petName">Qual é o nome do seu pet?</label>
          <input
            name="petName"
            type={'text'}
            placeholder={'Digite o nome do seu pet'}
            spellCheck={false}
            autoComplete={'off'}
            onChange={(e) => {
              formHandler('petName', e.target.value);
            }}
          ></input>
        </div>

        <div className="field">
          <label htmlFor="petImage">Para finalizar, envie a melhor foto do seu amigo!</label>
          <ImageDropzone onImageUpload={onImageUpload} />
        </div>

        <button className="confirm-schedule" type="submit">
          Confirmar Agendamento
        </button>
      </form>

      {/* Auto generated shape divider */}

      <div className="custom-shape-divider-bottom-1646357480">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </div>
  );
}
