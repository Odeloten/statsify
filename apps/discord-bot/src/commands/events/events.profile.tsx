/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import {
  Container,
  Footer,
  Header,
  Multiline,
  SidebarItem,
  Table,
  formatProgression,
  lineXpBar,
} from "#components";
import type { BaseProfileProps } from "../base.hypixel-command";
import type { Event } from "@statsify/schemas";
import type { LocalizeFunction } from "@statsify/discord";

interface EventTableProps {
  title: string;
  event: Event;
  t: LocalizeFunction;
  color: string;
}

const EventTable = ({ title, event, t, color }: EventTableProps) => {
  const levelling = [
    `§7${t("stats.event-level")}: ${color}${t(Math.floor(event.level))}`,
    formatProgression({
      t,
      label: t("stats.progression.exp"),
      progression: event.progression,
      currentLevel: `${color}${t(Math.floor(event.level))}`,
      nextLevel: `${color}${t(Math.floor(event.level) + 1)}`,
      renderXp: lineXpBar(color),
    }),
  ].join("\n");

  return (
    <Table.ts title={title}>
      <box width="remaining" align="center" direction="column" height="50%">
        <Multiline margin={2}>{levelling}</Multiline>
      </box>
      <Table.td title={t("stats.exp")} value={t(event.exp)} color={color} />
    </Table.ts>
  );
};

export const EventsProfile = ({
  player,
  skin,
  background,
  logo,
  user,
  badge,
  t,
}: BaseProfileProps) => {
  const { events } = player.stats.general;

  const sidebar: SidebarItem[] = [[t("stats.silver"), t(events.silver), "§7"]];

  return (
    <Container background={background}>
      <Header
        name={player.prefixName}
        skin={skin}
        badge={badge}
        sidebar={sidebar}
        time="LIVE"
        title="§l§5Event §fStats §r(2022)"
      />
      <Table.table>
        <Table.tr>
          <EventTable title="§eSummer" color="§e" event={events.summer2022} t={t} />
          <EventTable title="§5Halloween" color="§5" event={events.halloween2022} t={t} />
        </Table.tr>
      </Table.table>
      <Footer logo={logo} user={user} />
    </Container>
  );
};
