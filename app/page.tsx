import { siteConfig } from "@/lib/site-config";
import {
  CampaignsModule,
  EventsModule,
  FactStrip,
  FinalCtaModule,
  FocusAreasModule,
  GrantsTeaser,
  Hero,
  NewsroomModule,
  OpportunitiesModule,
  PooledFundsModule,
  ProgressTeaser,
  StoriesModule,
  TransparencyModule,
} from "@/components/home/modules";

// The homepage is data-driven — reorder or toggle modules in `siteConfig.home.modules`.
const MODULE_MAP = {
  hero: Hero,
  factStrip: FactStrip,
  focusAreas: FocusAreasModule,
  progressTeaser: ProgressTeaser,
  grantsTeaser: GrantsTeaser,
  pooledFunds: PooledFundsModule,
  opportunities: OpportunitiesModule,
  campaigns: CampaignsModule,
  stories: StoriesModule,
  newsroom: NewsroomModule,
  transparency: TransparencyModule,
  events: EventsModule,
  finalCta: FinalCtaModule,
} as const;

export default function HomePage() {
  return (
    <>
      {siteConfig.home.modules.map((key) => {
        const C = MODULE_MAP[key];
        return C ? <C key={key} /> : null;
      })}
    </>
  );
}
