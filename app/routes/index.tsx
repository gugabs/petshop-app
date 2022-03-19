import { Link, LinksFunction } from 'remix';

import globalStyle from '~/styles/index.css';
import componentStyle from '~/styles/homepage/index.css';

import WelcomeSectionIllustration from '~/components/homepage/WelcomeSectionIllustration/index';

import {
  WelcomeSectionDivider,
  links as welcomeSectionDividerLinks,
} from '~/components/homepage/WelcomeSectionDivider';

import { ScheduleCard, links as scheduleCardLinks } from '~/components/homepage/ScheduleCard';

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
    ...welcomeSectionDividerLinks(),
    ...scheduleCardLinks(),
  ];
};

export default function Index() {
  return (
    <>
      <div className="container">
        <section className="section-welcome">
          <div className="welcome-infos">
            <h1>Petshop</h1>
            <h2>Faça o agendamento de um de nossos serviços agora mesmo!</h2>
            <div className="welcome-btn-container">
              <Link to={'/createSchedule'}>
                <div className="welcome-btn">
                  <span>Agendar</span>
                </div>
              </Link>
            </div>
          </div>
          <div className="welcome-divider"></div>
          <div className="welcome-illustration">
            <WelcomeSectionIllustration />
          </div>
          <div className="welcome-section-divider">
            <WelcomeSectionDivider />
          </div>
        </section>
        <section className="section-schedules">
          <h1>Últimos agendamentos</h1>
          <div className="schedules-grid">
            <ScheduleCard size={'s-2x1'} />
            <ScheduleCard size={'s-1x1'} />
            <ScheduleCard size={'s-1x2'} />
            <ScheduleCard size={'s-1x1'} />
            <ScheduleCard size={'s-2x1'} />
          </div>
        </section>
      </div>
    </>
  );
}
