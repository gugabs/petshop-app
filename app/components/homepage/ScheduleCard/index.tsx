import { LinksFunction } from 'remix';

import componentStyle from '~/components/homepage/ScheduleCard/index.css';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: componentStyle,
    },
  ];
};

export function ScheduleCard(props: any) {
  const { size } = props;

  return (
    <>
      <div className={`item ${size}`}>
        <img
          className="item-background"
          src="https://diariodonordeste.verdesmares.com.br/image/contentid/policy:1.3136324:1631737586/Beagle.jpg?f=16x9&h=720&q=0.8&w=1280&$p$f$h$q$w=d000eb3"
          alt=""
        />
        <div className="item-cover">
          <h1>Pet name</h1>
        </div>
      </div>
    </>
  );
}
