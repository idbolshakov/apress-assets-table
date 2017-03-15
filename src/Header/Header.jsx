import {block} from '../utils';
import Toggler from '../Toggler/Toggler';
import './e-header.scss';

const {PropTypes} = React;
const b = block('e-header');

const Header = props =>
  <header className={b}>
    {!(props.toggler === undefined) &&
      <section className={b('box-1')}>
        <div className={b('swich-view')}>
          <div
            onClick={() => { props.toggler && props.onToggle(); }}
            className={b('swich-view-to-rocket')}
          />
          <Toggler on={props.toggler} onToggle={props.onToggle} />
          <div
            onClick={() => { !props.toggler && props.onToggle(); }}
            className={b('swich-view-to-book')}
          />
        </div>
      </section>
    }
    <section className={b('box-2')}>
      <div className={b('title')}><b>Редактор</b> Товарных групп</div>
    </section>
    <section className={b('box-3')}>
      <nav className={b('nav')}>
        {props.onCallProductsAndGroups &&
          <div className={b('nav-box')}>
            <div className={b('nav-item')}>
              <a
                onClick={(e) => { e.preventDefault(); props.onCallProductsAndGroups(); }}
                className={b('nav-lnk')} href=''
              >
                Товары и группы на Главной
              </a>
            </div>
          </div>
        }
        {props.onDeleteSelectedGroup &&
          <div className={b('nav-box')}>
            <div className={b('nav-item')}>
              <a
                onClick={(e) => { e.preventDefault(); props.onDeleteSelectedGroup(); }}
                className={b('nav-lnk')} href=''
              >
                Удалить выбранную группу{' '}
                {!!props.selectedGroupsCount && `(${props.selectedGroupsCount})`}
              </a>
            </div>
          </div>}
        {props.onDeleteEmptyGroup &&
          <div className={b('nav-box')}>
            <div className={b('nav-item')}>
              <a
                onClick={(e) => { e.preventDefault(); props.onDeleteEmptyGroup(); }}
                className={b('nav-lnk').mix('is-danger')} href=''
              >
                Удалить пустые группы
              </a>
            </div>
          </div>
        }
      </nav>
    </section>
    <section className={b('box-4')}>
      <nav className={b('sub-nav')}>
        <a className={b('sub-nav-lnk')} href={props.instructionHref}>Инструкция</a>
        <a className={b('sub-nav-lnk').mix('is-to-site')} href={props.toSiteHref}>На сайт</a>
      </nav>
    </section>
  </header>;

Header.propTypes = {
  toggler: PropTypes.bool,
  selectedGroupsCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  instructionHref: PropTypes.string,
  toSiteHref: PropTypes.string,
  onToggle: PropTypes.func,
  onCallProductsAndGroups: PropTypes.func,
  onDeleteEmptyGroup: PropTypes.func,
  onDeleteSelectedGroup: PropTypes.func,
};

Header.defaultProps = {
  disabled: false,
};


export default Header;
