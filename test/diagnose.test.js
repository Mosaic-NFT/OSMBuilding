/**
 * @jest-environment jsdom
 */

import { Shape, Mesh } from 'three';
import { TextEncoder } from 'node:util';
import {expect, test, beforeEach, describe} from '@jest/globals';
global.TextEncoder = TextEncoder;

import {apis} from '../src/apis.js';
global.apis = apis;

import { Building } from '../src/building.js';

import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

const initialData = `<?xml version='1.0' encoding='UTF-8'?>
<osm version="0.6" generator="openstreetmap-cgimap 2.0.1 (13 production-cgimap-deployment-6c848f5954-fwsw9)" copyright="OpenHistoricalMap is dedicated to the public domain except where otherwise noted." attribution="https://www.openhistoricalmap.org/copyright" license="https://creativecommons.org/public-domain/cc0/">
<node id="2091055219" visible="true" version="5" changeset="183738" timestamp="2025-07-17T03:14:16Z" user="CharliePlett" uid="1310" lat="17.2578575" lon="-88.9935839"/>
<node id="2091055220" visible="true" version="2" changeset="124696" timestamp="2024-06-24T14:12:44Z" user="CharliePlett" uid="1310" lat="17.2579092" lon="-88.9936201"/>
<node id="2091055221" visible="true" version="4" changeset="183738" timestamp="2025-07-17T03:14:16Z" user="CharliePlett" uid="1310" lat="17.2580413" lon="-88.9936212"/>
<node id="2091055225" visible="true" version="5" changeset="183738" timestamp="2025-07-17T03:14:16Z" user="CharliePlett" uid="1310" lat="17.2578904" lon="-88.9932578"/>
<node id="2091055226" visible="true" version="5" changeset="183738" timestamp="2025-07-17T03:14:16Z" user="CharliePlett" uid="1310" lat="17.2580338" lon="-88.9932589"/>
<node id="2091055229" visible="true" version="5" changeset="183738" timestamp="2025-07-17T03:14:16Z" user="CharliePlett" uid="1310" lat="17.2576142" lon="-88.9935169"/>
<node id="2091055230" visible="true" version="5" changeset="183738" timestamp="2025-07-17T03:14:16Z" user="CharliePlett" uid="1310" lat="17.2576160" lon="-88.9932556"/>
<node id="2091090152" visible="true" version="4" changeset="183738" timestamp="2025-07-17T03:14:16Z" user="CharliePlett" uid="1310" lat="17.2576687" lon="-88.9935824"/>
<node id="2118297439" visible="true" version="3" changeset="183738" timestamp="2025-07-17T03:14:16Z" user="CharliePlett" uid="1310" lat="17.2576137" lon="-88.9935820"/>
<node id="2118297440" visible="true" version="3" changeset="183738" timestamp="2025-07-17T03:14:16Z" user="CharliePlett" uid="1310" lat="17.2581870" lon="-88.9936225"/>
<node id="2118297441" visible="true" version="3" changeset="183738" timestamp="2025-07-17T03:14:16Z" user="CharliePlett" uid="1310" lat="17.2581863" lon="-88.9937191"/>
<node id="2118297442" visible="true" version="3" changeset="183738" timestamp="2025-07-17T03:14:16Z" user="CharliePlett" uid="1310" lat="17.2584306" lon="-88.9937212"/>
<node id="2118297443" visible="true" version="3" changeset="183738" timestamp="2025-07-17T03:14:16Z" user="CharliePlett" uid="1310" lat="17.2584351" lon="-88.9931509"/>
<node id="2118297444" visible="true" version="3" changeset="183738" timestamp="2025-07-17T03:14:16Z" user="CharliePlett" uid="1310" lat="17.2583754" lon="-88.9931504"/>
<node id="2118297445" visible="true" version="3" changeset="183738" timestamp="2025-07-17T03:14:16Z" user="CharliePlett" uid="1310" lat="17.2583756" lon="-88.9931220"/>
<node id="2118297446" visible="true" version="3" changeset="183738" timestamp="2025-07-17T03:14:16Z" user="CharliePlett" uid="1310" lat="17.2582611" lon="-88.9931210"/>
<node id="2136764872" visible="true" version="2" changeset="183738" timestamp="2025-07-17T03:14:16Z" user="CharliePlett" uid="1310" lat="17.2576156" lon="-88.9933122"/>
<node id="2136764874" visible="true" version="2" changeset="183738" timestamp="2025-07-17T03:14:16Z" user="CharliePlett" uid="1310" lat="17.2576159" lon="-88.9932694"/>
<node id="2136764882" visible="true" version="2" changeset="183738" timestamp="2025-07-17T03:14:16Z" user="CharliePlett" uid="1310" lat="17.2584313" lon="-88.9936317"/>
<node id="2136764893" visible="true" version="1" changeset="183733" timestamp="2025-07-17T03:03:42Z" user="CharliePlett" uid="1310" lat="17.2581813" lon="-88.9932416"/>
<node id="2136764894" visible="true" version="1" changeset="183733" timestamp="2025-07-17T03:03:42Z" user="CharliePlett" uid="1310" lat="17.2581857" lon="-88.9932332"/>
<node id="2136764895" visible="true" version="1" changeset="183733" timestamp="2025-07-17T03:03:42Z" user="CharliePlett" uid="1310" lat="17.2581881" lon="-88.9931285"/>
<node id="2136764896" visible="true" version="2" changeset="183738" timestamp="2025-07-17T03:14:16Z" user="CharliePlett" uid="1310" lat="17.2583755" lon="-88.9931289"/>
<node id="2136764905" visible="true" version="1" changeset="183733" timestamp="2025-07-17T03:03:42Z" user="CharliePlett" uid="1310" lat="17.2581826" lon="-88.9932370"/>
<node id="2136764906" visible="true" version="1" changeset="183733" timestamp="2025-07-17T03:03:42Z" user="CharliePlett" uid="1310" lat="17.2581866" lon="-88.9932294"/>
<node id="2136764908" visible="true" version="2" changeset="183738" timestamp="2025-07-17T03:14:16Z" user="CharliePlett" uid="1310" lat="17.2582610" lon="-88.9931268"/>
<node id="2136764910" visible="true" version="2" changeset="183738" timestamp="2025-07-17T03:14:16Z" user="CharliePlett" uid="1310" lat="17.2582610" lon="-88.9931305"/>
<node id="2136765022" visible="true" version="2" changeset="183738" timestamp="2025-07-17T03:14:16Z" user="CharliePlett" uid="1310" lat="17.2581810" lon="-88.9932601"/>
<node id="2136765040" visible="true" version="1" changeset="183738" timestamp="2025-07-17T03:14:16Z" user="CharliePlett" uid="1310" lat="17.2576138" lon="-88.9935727"/>
<way id="201181659" visible="true" version="2" changeset="183738" timestamp="2025-07-17T03:14:16Z" user="CharliePlett" uid="1310">
<nd ref="2091055230"/>
<nd ref="2091055225"/>
<nd ref="2091055226"/>
<nd ref="2136765022"/>
<nd ref="2136764893"/>
<nd ref="2136764905"/>
<nd ref="2136764894"/>
<nd ref="2136764906"/>
<nd ref="2136764895"/>
<nd ref="2136764910"/>
<nd ref="2136764908"/>
<nd ref="2118297446"/>
<nd ref="2118297445"/>
<nd ref="2136764896"/>
<nd ref="2118297444"/>
<nd ref="2118297443"/>
<nd ref="2136764882"/>
<nd ref="2118297442"/>
<nd ref="2118297441"/>
<nd ref="2118297440"/>
<nd ref="2091055221"/>
<nd ref="2091055220"/>
<nd ref="2091055219"/>
<nd ref="2091090152"/>
<nd ref="2118297439"/>
<nd ref="2136765040"/>
<nd ref="2091055229"/>
<nd ref="2136764872"/>
<nd ref="2136764874"/>
<nd ref="2091055230"/>
<tag k="building" v="industrial"/>
<tag k="name" v="Country Foods"/>
<tag k="start_date" v="2025"/>
<tag k="wikidata" v="Q39057725"/>
<tag k="wikipedia" v="en:Country Foods"/>
</way>
</osm>
`;

test('Diagnose Skillion Issue', async() => {
  fetch.mockResponses(
    [initialData],    // /way/201181659/full
    [initialData],         // /map call
  );
  const innerData = await Building.downloadDataAroundBuilding('way', '201181659');
  const building = new Building('201181659', innerData);
  expect(building.id).toBe('201181659');
  const urlBase = 'https://api.openstreetmap.org/api/0.6/';
  expect(global.fetch.mock.calls[0][0]).toBe(urlBase + 'relation/42/full');
  expect(global.fetch.mock.calls[1][0]).toBe(urlBase + 'map?bbox=30.4980057,59.9380365,30.4993839,59.9385087');
});
