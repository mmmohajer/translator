import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faCircleUser,
  faCalendarDays,
  faAngleLeft,
  faAngleRight,
  faPlayCircle,
  faAngleUp,
  faSearch,
  faCheck,
  faEye,
  faEyeSlash,
  faUpload,
  faCirclePlay,
  faArrowRight,
  faFilePdf,
  faFileWord,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import {
  faSquareInstagram,
  faLinkedin,
  faYoutube,
  faTelegram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

import Div from "@/baseComponents/reusableComponents/Div";

const Icon = ({
  type = "close",
  color = "black",
  width = "16px",
  height = "16px",
  scale = 1,
}) => {
  return (
    <>
      {type === "close" ? (
        <FontAwesomeIcon
          icon={faClose}
          style={{ color, width, height, transform: `scale(${scale})` }}
        />
      ) : (
        ""
      )}

      {type === "left" ? (
        <FontAwesomeIcon
          icon={faAngleLeft}
          style={{ color, width, height, transform: `scale(${scale})` }}
        />
      ) : (
        ""
      )}

      {type === "right" ? (
        <FontAwesomeIcon
          icon={faAngleRight}
          style={{ color, width, height, transform: `scale(${scale})` }}
        />
      ) : (
        ""
      )}

      {type === "play-circle" ? (
        <FontAwesomeIcon
          icon={faPlayCircle}
          style={{ color, width, height, transform: `scale(${scale})` }}
        />
      ) : (
        ""
      )}

      {type === "instagram" ? (
        <FontAwesomeIcon
          icon={faSquareInstagram}
          style={{ color, width, height, transform: `scale(${scale})` }}
        />
      ) : (
        ""
      )}

      {type === "linkedin" ? (
        <FontAwesomeIcon
          icon={faLinkedin}
          style={{ color, width, height, transform: `scale(${scale})` }}
        />
      ) : (
        ""
      )}

      {type === "youtube" ? (
        <FontAwesomeIcon
          icon={faYoutube}
          style={{ color, width, height, transform: `scale(${scale})` }}
        />
      ) : (
        ""
      )}

      {type === "telegram" ? (
        <FontAwesomeIcon
          icon={faTelegram}
          style={{ color, width, height, transform: `scale(${scale})` }}
        />
      ) : (
        ""
      )}

      {type === "github" ? (
        <FontAwesomeIcon
          icon={faGithub}
          style={{ color, width, height, transform: `scale(${scale})` }}
        />
      ) : (
        ""
      )}

      {type === "circle-user" ? (
        <FontAwesomeIcon
          icon={faCircleUser}
          style={{ color, width, height, transform: `scale(${scale})` }}
        />
      ) : (
        ""
      )}

      {type === "calendar-days" ? (
        <FontAwesomeIcon
          icon={faCalendarDays}
          style={{ color, width, height, transform: `scale(${scale})` }}
        />
      ) : (
        ""
      )}

      {type === "angle-up" ? (
        <FontAwesomeIcon
          icon={faAngleUp}
          style={{ color, width, height, transform: `scale(${scale})` }}
        />
      ) : (
        ""
      )}

      {type === "search" ? (
        <FontAwesomeIcon
          icon={faSearch}
          style={{ color, width, height, transform: `scale(${scale})` }}
        />
      ) : (
        ""
      )}

      {type === "check-mark" ? (
        <FontAwesomeIcon
          icon={faCheck}
          style={{ color, width, height, transform: `scale(${scale})` }}
        />
      ) : (
        ""
      )}

      {type === "eye" ? (
        <FontAwesomeIcon
          icon={faEye}
          style={{ color, width, height, transform: `scale(${scale})` }}
        />
      ) : (
        ""
      )}

      {type === "eye-slash" ? (
        <FontAwesomeIcon
          icon={faEyeSlash}
          style={{ color, width, height, transform: `scale(${scale})` }}
        />
      ) : (
        ""
      )}

      {type === "upload" ? (
        <FontAwesomeIcon
          icon={faUpload}
          style={{ color, width, height, transform: `scale(${scale})` }}
        />
      ) : (
        ""
      )}

      {type === "circle-play" ? (
        <FontAwesomeIcon
          icon={faCirclePlay}
          style={{ color, width, height, transform: `scale(${scale})` }}
        />
      ) : (
        ""
      )}

      {type === "arrow-right" ? (
        <FontAwesomeIcon
          icon={faArrowRight}
          style={{ color, width, height, transform: `scale(${scale})` }}
        />
      ) : (
        ""
      )}

      {type === "file-pdf" ? (
        <FontAwesomeIcon
          icon={faFilePdf}
          style={{ color, width, height, transform: `scale(${scale})` }}
        />
      ) : (
        ""
      )}

      {type === "file-word" ? (
        <FontAwesomeIcon
          icon={faFileWord}
          style={{ color, width, height, transform: `scale(${scale})` }}
        />
      ) : (
        ""
      )}

      {type === "edit" ? (
        <FontAwesomeIcon
          icon={faEdit}
          style={{ color, width, height, transform: `scale(${scale})` }}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Icon;
