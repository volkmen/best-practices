import React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import TextResourceContext from 'contexts/TextResource';
import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

import './TabsPanel.scss';
import { StyledComponent } from 'types';

export interface TabsPanelProps extends StyledComponent {
  tabs: string[];
  tabsPanels: React.ReactNode[] | null;
  afterElements?: React.ReactNode | null;
  type?: 'tab' | 'list';
  tabsListBodyClassName?: string;
  tabsListClassName?: string;
  tabPanelClassName?: string;
  subTabs?: React.ReactNode[];
  searchQuery?: string;
  preElements?: React.ReactNode | null;
  title?: React.ReactNode;
  onSelectTabIndex?: (index: number) => void;
}

export const SUBTAB_INDEX_PREFIX = 'subTabIndex';

const TabsPanel: React.FC<TabsPanelProps> = ({
  tabs,
  tabsPanels,
  afterElements,
  type = 'tab',
  tabsListBodyClassName,
  tabsListClassName,
  tabPanelClassName,
  searchQuery = 'tabIndex',
  preElements,
  title,
  className,
  onSelectTabIndex: onSelectIndexFromProps
}) => {
  const { getTextResourceByKey } = React.useContext(TextResourceContext);

  const tabItemsConverted = React.useMemo<string[]>(
    () => tabs?.map(tabItem => getTextResourceByKey(tabItem) as string).filter(Boolean),
    [getTextResourceByKey, tabs]
  );

  const location = useLocation();
  const navigate = useNavigate();
  const search = location.search;

  const searchParams = new URLSearchParams(search);
  const tabIndex = searchParams.get(searchQuery);

  const selectedIndex = tabIndex ? +tabIndex : 0;

  const setSelectedIndex = React.useCallback(
    (index: number, replace = false) => {
      const localSearch = location.search;
      const localSearchParams = new URLSearchParams(localSearch);

      if (searchQuery === 'tabIndex' && index !== selectedIndex) {
        for (const query of localSearchParams.keys()) {
          if (query.includes(SUBTAB_INDEX_PREFIX)) {
            localSearchParams.delete(query);
          }
        }
      }
      localSearchParams.set(searchQuery, index.toString());

      onSelectIndexFromProps?.(index);

      navigate(`${location.pathname}?${localSearchParams.toString()}`, { replace });
    },
    [location.search]
  );

  React.useEffect(() => {
    const localSearch = location.search;
    const localSearchParams = new URLSearchParams(localSearch);

    if (!localSearchParams.has(searchQuery)) {
      setSelectedIndex(selectedIndex, true);
    } else {
      onSelectIndexFromProps?.(selectedIndex);
    }
  }, []);

  return (
    <Tabs
      className={classNames('my-tabs-panel', className)}
      onSelect={index => setSelectedIndex(index, true)}
      selectedIndex={selectedIndex}
    >
      <TabList className={classNames('mb-2', tabsListClassName)}>
        <div className={classNames('filters-placeholder flex-space-between', tabsListBodyClassName)}>
          <div className='d-flex'>
            {title && <div className='pt-2 ml-2'>{title}</div>}
            {preElements}
            {tabItemsConverted.map(tabItem => (
              <Tab
                key={tabItem}
                className={classNames(`my-tabs-panel__${type}`)}
                selectedClassName={`my-tabs-panel__${type}-selected`}
              >
                {tabItem}
              </Tab>
            ))}
          </div>
          {afterElements}
        </div>
      </TabList>
      {tabsPanels?.map((tabPanel, i) => (
        <TabPanel key={`tabPanel-${tabs[i]}`} selectedClassName={classNames('my-tabs-panel__panel', tabPanelClassName)}>
          {tabPanel}
        </TabPanel>
      ))}
    </Tabs>
  );
};

export default TabsPanel;
