"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faStar, faUserTie, faHeadset, faComments, faLayerGroup, faShieldHalved,
  faSitemap, faGears, faCodeBranch, faPlug, faDatabase, faRocket,
  faEarthAmericas, faServer, faLeaf, faBolt, faWind, faDiagramProject,
  faGaugeHigh, faVideo, faRobot, faUsers, faBriefcase, faCertificate,
  faCode, faBuilding, faCheck, faChevronDown, faChevronLeft, faChevronRight,
  faDownload, faPhone, faEnvelope, faLocationDot, faCircleQuestion,
  faQuoteLeft, faTrophy, faCloud, faXmark, faUserCheck, faT, faBars,
  faPlaneDeparture, faArrowRight, faMobileScreenButton, faFlask, faGavel,
  faClock, faCalendar, faHourglassHalf, faCheckCircle, faLock,
} from "@fortawesome/free-solid-svg-icons";
import {
  faReact, faNodeJs, faJs, faDocker, faLinkedinIn, faLinkedin,
  faSalesforce, faYoutube, faInstagram, faXTwitter, faCss3Alt, faHtml5, faGithub,
} from "@fortawesome/free-brands-svg-icons";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

// Run once — library.add is idempotent but guard anyway
let _libInit = false;
if (!_libInit) {
  _libInit = true;
  library.add(
    faStar, faUserTie, faHeadset, faComments, faLayerGroup, faShieldHalved,
    faSitemap, faGears, faCodeBranch, faPlug, faDatabase, faRocket,
    faEarthAmericas, faServer, faLeaf, faBolt, faWind, faDiagramProject,
    faGaugeHigh, faVideo, faRobot, faUsers, faBriefcase, faCertificate,
    faCode, faBuilding, faCheck, faChevronDown, faChevronLeft, faChevronRight,
    faDownload, faPhone, faEnvelope, faLocationDot, faCircleQuestion,
    faQuoteLeft, faTrophy, faCloud, faXmark, faUserCheck, faT, faBars,
    faPlaneDeparture, faArrowRight, faMobileScreenButton, faFlask, faGavel,
    faClock, faCalendar, faHourglassHalf, faCheckCircle, faLock,
    faReact, faNodeJs, faJs, faDocker, faLinkedinIn, faLinkedin,
    faSalesforce, faYoutube, faInstagram, faXTwitter, faCss3Alt, faHtml5, faGithub,
  );
}

interface IconProps {
  icon: IconProp | readonly [string, string];
  className?: string;
  style?: React.CSSProperties;
  "aria-hidden"?: boolean;
}

export default function Icon({ icon, className, style, "aria-hidden": ariaHidden }: IconProps) {
  return (
    <FontAwesomeIcon
      icon={icon as IconProp}
      className={className}
      style={style as React.CSSProperties & Record<string, string>}
      aria-hidden={ariaHidden}
    />
  );
}
