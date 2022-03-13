import { LinksFunction } from 'remix';

import { IServiceOption } from '~/compiler/types';

import componentStyle from '~/components/createSchedule/ServiceOption/style.css';

import { BsCheckCircleFill } from 'react-icons/bs';

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: componentStyle,
  },
];

const ServiceOption = (props: IServiceOption) => {
  const { serviceName, serviceIcon } = props;
  const { isSelected } = props.status;
  const { selectService } = props.handlers!;

  return (
    <div
      className={`option ${isSelected && 'selected'}`}
      onClick={() => {
        selectService(props);
      }}
    >
      <div className="option-icon">{serviceIcon}</div>
      <div className="option-description">
        <p>{serviceName}</p>
      </div>
      <div className={`select-check ${!isSelected && 'hidden'}`}>{<BsCheckCircleFill />}</div>
    </div>
  );
};

export default ServiceOption;
