'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef, useEffect, useMemo, useState, useCallback } from 'react';
import { MapPin, Store, Gift, Star, Navigation, Handshake, Crosshair } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from "next/link";
import { useLocale } from 'next-intl';

// Map (SSR-safe)
const MapContainer  = dynamic(() => import('react-leaflet').then(m => m.MapContainer),  { ssr: false });
const TileLayer     = dynamic(() => import('react-leaflet').then(m => m.TileLayer),      { ssr: false });
const Marker        = dynamic(() => import('react-leaflet').then(m => m.Marker),         { ssr: false });
const Popup         = dynamic(() => import('react-leaflet').then(m => m.Popup),          { ssr: false });
const CircleMarker  = dynamic(() => import('react-leaflet').then(m => m.CircleMarker),   { ssr: false });

/* ----------------- DATA ----------------- */
const partners = [
  { name: 'Starbucks',   category: 'Coffee',      locations: 1200, color: 'from-green-500 to-green-600' },
  { name: "McDonald's",  category: 'Fast Food',   locations: 850,   color: 'from-yellow-500 to-red-500' },
  { name: 'Target',      category: 'Retail',      locations: 650,   color: 'from-red-500 to-red-600' },
  { name: 'Best Buy',    category: 'Electronics', locations: 420,   color: 'from-blue-500 to-blue-600' },
  { name: 'Walmart',     category: 'Supermarket', locations: 980,   color: 'from-blue-600 to-indigo-600' },
  { name: 'CVS Pharmacy',category: 'Pharmacy',    locations: 750,   color: 'from-red-600 to-pink-600' },
] as const;
type PartnerName = typeof partners[number]['name'];

const storeLocations = [
  { id: 1,  lat: 52.5200, lng: 13.4050, name: 'Alexanderplatz',        city: 'Berlin',     partner: 'Starbucks',    address: 'Alexanderstraße 3, 10178 Berlin' },
  { id: 2,  lat: 52.5163, lng: 13.3777, name: 'Brandenburg Gate',      city: 'Berlin',     partner: "McDonald's",   address: 'Pariser Platz, 10117 Berlin' },
  { id: 3,  lat: 52.5076, lng: 13.3904, name: 'Potsdamer Platz',       city: 'Berlin',     partner: 'Target',       address: 'Potsdamer Platz 1, 10785 Berlin' },
  { id: 4,  lat: 48.1372, lng: 11.5756, name: 'Marienplatz',           city: 'Munich',     partner: 'Starbucks',    address: 'Marienplatz 8, 80331 München' },
  { id: 5,  lat: 48.1402, lng: 11.5600, name: 'Karlsplatz (Stachus)',  city: 'Munich',     partner: "McDonald's",   address: 'Karlsplatz 1, 80335 München' },
  { id: 6,  lat: 53.5511, lng: 9.9937,  name: 'Jungfernstieg',         city: 'Hamburg',    partner: 'Starbucks',    address: 'Jungfernstieg 24, 20354 Hamburg' },
  { id: 7,  lat: 53.5438, lng: 9.9861,  name: 'Speicherstadt',         city: 'Hamburg',    partner: 'Best Buy',     address: 'Am Sandtorkai 36, 20457 Hamburg' },
  { id: 8,  lat: 50.9413, lng: 6.9583,  name: 'Cologne Cathedral',     city: 'Cologne',    partner: 'Walmart',      address: 'Domkloster 4, 50667 Köln' },
  { id: 9,  lat: 50.9364, lng: 6.9528,  name: 'Hohe Straße',           city: 'Cologne',    partner: "McDonald's",   address: 'Hohe Str. 68, 50667 Köln' },
  { id:10,  lat: 50.1109, lng: 8.6821,  name: 'Römerberg',             city: 'Frankfurt',  partner: 'CVS Pharmacy', address: 'Römerberg 27, 60311 Frankfurt am Main' },
  { id:11,  lat: 50.1126, lng: 8.6831,  name: 'Zeil',                  city: 'Frankfurt',  partner: 'Target',       address: 'Zeil 106, 60313 Frankfurt am Main' },
  { id:12,  lat: 48.7758, lng: 9.1829,  name: 'Königstraße',           city: 'Stuttgart',  partner: 'Starbucks',    address: 'Königstraße 12, 70173 Stuttgart' },
  { id:13,  lat: 51.2277, lng: 6.7735,  name: 'Königsallee',           city: 'Düsseldorf', partner: 'Best Buy',     address: 'Königsallee 26, 40212 Düsseldorf' },
  { id:14,  lat: 51.3397, lng:12.3731,  name: 'Marktplatz',            city: 'Leipzig',    partner: 'Walmart',      address: 'Markt 1, 04109 Leipzig' },
  { id:15,  lat: 51.0504, lng:13.7373,  name: 'Altmarkt',              city: 'Dresden',    partner: "McDonald's",   address: 'Altmarkt 10, 01067 Dresden' },
  { id:16,  lat: 49.4521, lng:11.0767,  name: 'Hauptmarkt',            city: 'Nuremberg',  partner: 'Starbucks',    address: 'Hauptmarkt 14, 90403 Nürnberg' },
  { id:17,  lat: 52.3759, lng: 9.7320,  name: 'Ernst-August-Platz',    city: 'Hannover',   partner: 'CVS Pharmacy', address: 'Ernst-August-Platz 2, 30159 Hannover' },
  { id:18,  lat: 53.0793, lng: 8.8017,  name: 'Domshof',               city: 'Bremen',     partner: 'Target',       address: 'Domshof 5, 28195 Bremen' },
  { id:19,  lat: 51.5136, lng: 7.4653,  name: 'Westenhellweg',         city: 'Dortmund',   partner: 'Best Buy',     address: 'Westenhellweg 40, 44137 Dortmund' },
  { id:20,  lat: 49.4875, lng: 8.4660,  name: 'Planken',               city: 'Mannheim',   partner: 'Starbucks',    address: 'P7 12, 68161 Mannheim' },
  { id:21,  lat: 50.7374, lng: 7.0982,  name: 'Münsterplatz',          city: 'Bonn',       partner: "McDonald's",   address: 'Münsterplatz 6, 53111 Bonn' },
  { id:22,  lat: 54.3233, lng:10.1228,  name: 'Holstenstraße',         city: 'Kiel',       partner: 'Walmart',      address: 'Holstenstraße 30, 24103 Kiel' },
] as const;

type StoreItem = { id: number; lat: number; lng: number; name: string; city: string; partner: string; address: string };

/* ----------------- GERMANY BOUNDS ----------------- */
const DE_BOUNDS: [[number, number], [number, number]] = [[47.2701, 5.8663], [55.0581, 15.0419]];
const DE_CENTER: [number, number] = [51.1657, 10.4515];

/* ----------------- HELPERS ----------------- */
function PopupCard({ store }: { store: StoreItem }) {
  return (
    <div className="p-3 min-w-[200px]">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 bg-gradient-to-r from-orange-main to-gradient-app-main-1 rounded-full flex items-center justify-center">
          <Store className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-main-purple">{store.partner}</h3>
          <p className="text-sm text-gray-600">{store.name}</p>
        </div>
      </div>
      <p className="text-xs text-gray-500 mb-2">{store.address}</p>
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
        <span className="text-xs text-gray-600 ml-1">4.8</span>
      </div>
    </div>
  );
}
const clampToBounds = ([lat, lng]: [number, number]): [number, number] => {
  const [[sLat, sLng], [nLat, nLng]] = DE_BOUNDS;
  return [Math.min(Math.max(lat, sLat), nLat), Math.min(Math.max(lng, sLng), nLng)];
};

/* =================== COMPONENT =================== */
export function RewardPartners() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const locale = useLocale();
  const [isClient, setIsClient] = useState(false);

  // Keep the map instance OUT of React state -> no extra renders / no double init
  const mapRef = useRef<any>(null);

  const [selected, setSelected] = useState<PartnerName | 'All'>('All');

  // Search (debounced)
  const [q, setQ] = useState('');
  const [results, setResults] = useState<Array<{display_name: string; lat: string; lon: string}>>([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Current location
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  const [acc, setAcc]         = useState<number | null>(null);
  const [locating, setLocating] = useState(false);

  /* ---- mount ---- */
  useEffect(() => {
    setIsClient(true);
    // Leaflet CSS once
    import('leaflet/dist/leaflet.css');
    // Marker icons setup once
    import('leaflet').then(L => {
      // @ts-ignore private property
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl:       'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl:     'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    });
  }, []);

  /* ---- memoized data ---- */
  const filteredPartners = useMemo(
    () => (selected === 'All' ? partners : partners.filter(p => p.name === selected)),
    [selected]
  );
  const filteredStores: StoreItem[] = useMemo(
    () => (selected === 'All'
      ? (storeLocations as unknown as StoreItem[])
      : (storeLocations as unknown as StoreItem[]).filter(s => s.partner === selected)
    ),
    [selected]
  );

  /* ---- stable callbacks ---- */
  const flyToPartner = useCallback((p: PartnerName) => {
    const s = (storeLocations as unknown as StoreItem[]).find(x => x.partner === p);
    setSelected(p);
    if (!s || !mapRef.current) return;
    const target = clampToBounds([s.lat, s.lng]);
    mapRef.current.flyTo(target, 12, { duration: 1.2 });
  }, []);

  const chooseResult = useCallback((latStr: string, lonStr: string) => {
    if (!mapRef.current) return;
    const clamped = clampToBounds([parseFloat(latStr), parseFloat(lonStr)]);
    mapRef.current.flyTo(clamped, 12, { duration: 1.0 });
  }, []);

  const runSearch = useCallback(async (term: string) => {
    if (!term.trim()) { setResults([]); setSearchError(null); return; }
    try {
      setSearching(true);
      setSearchError(null);
      const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(term)}&countrycodes=de&addressdetails=1&limit=5`;
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(`Search failed (${res.status})`);
      const data = await res.json();
      setResults(data);
    } catch (e: any) {
      setSearchError(e?.message ?? 'Search failed');
      setResults([]);
    } finally {
      setSearching(false);
    }
  }, []);

  // debounce search as user types
  useEffect(() => {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => runSearch(q), 350);
    return () => { if (searchTimer.current) clearTimeout(searchTimer.current); };
  }, [q, runSearch]);

  const locateMe = useCallback(async () => {
    if (!navigator.geolocation || !mapRef.current) return;
    setLocating(true);
    try {
      // @ts-ignore optional permissions api
      const perm = navigator.permissions ? await navigator.permissions.query({ name: 'geolocation' }) : null;
      if (perm && perm.state === 'denied') {
        alert('Location permission is blocked. Please enable location access in your browser settings.');
        setLocating(false);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        pos => {
          const clamped = clampToBounds([pos.coords.latitude, pos.coords.longitude]);
          setUserPos(clamped);
          setAcc(pos.coords.accuracy ?? null);
          mapRef.current.flyTo(clamped, 13, { duration: 1.0 });
          setLocating(false);
        },
        err => {
          console.warn('Geolocation error:', err?.message);
          alert('Unable to fetch your location. Please allow permission and try again.');
          setLocating(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
      );
    } catch {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const clamped = clampToBounds([pos.coords.latitude, pos.coords.longitude]);
          setUserPos(clamped);
          setAcc(pos.coords.accuracy ?? null);
          mapRef.current.flyTo(clamped, 13, { duration: 1.0 });
          setLocating(false);
        },
        () => {
          alert('Unable to fetch your location. Please allow permission and try again.');
          setLocating(false);
        }
      );
    }
  }, []);

  /* ---- memoize marker elements so MapContainer children are stable ---- */
  const markerNodes = useMemo(
    () => filteredStores.map((s) => (
      <Marker key={s.id} position={[s.lat, s.lng]}>
        <Popup><PopupCard store={s} /></Popup>
      </Marker>
    )),
    [filteredStores]
  );

  return (
    <>
      <style jsx global>{`
        .leaflet-container { border-radius: 1rem; z-index: 1; }
        .leaflet-popup-content-wrapper { border-radius: 12px; box-shadow: 0 20px 25px -5px rgba(0,0,0,.1), 0 10px 10px -5px rgba(0,0,0,.04); }
        .leaflet-popup-tip { background: white; }
        .pulse::after{
          content:'';
          position:absolute; inset:-6px;
          border-radius:9999px;
          border:2px solid rgba(67,53,167,.35);
          animation:pulse 1.2s ease-out infinite;
        }
        @keyframes pulse { from{transform:scale(.85); opacity:.9} to{transform:scale(1.25); opacity:0} }
      `}</style>

      <section ref={sectionRef} id="reward-partners" className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
        <div ref={ref} className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-main to-gradient-app-main-1 text-white px-5 py-2.5 rounded-full mb-4">
              <Gift className="w-5 h-5" />
              <span className="font-semibold">Reward Partners</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-main-purple">Partners near you</h2>
            <p className="mt-3 text-gray-600 text-lg">Use the map (Germany only) or browse the list.</p>
          </div>

          {/* Split layout: map left, list right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* MAP LEFT (sticky) */}
            <div className="order-1 md:order-none md:sticky md:top-24">
              <div className="bg-white/70 backdrop-blur rounded-2xl p-3 border border-white/60 shadow-xl">
                <div className="relative w-full aspect-[16/12] md:h-[560px] md:aspect-auto rounded-xl overflow-hidden">
                  {isClient && (
                    <MapContainer
                      // IMPORTANT: mount ONCE and never change these stable props
                      center={DE_CENTER}
                      zoom={6}
                      minZoom={5}
                      maxZoom={17}
                      maxBounds={DE_BOUNDS as any}
                      maxBoundsViscosity={1.0}
                      whenCreated={(m) => { if (!mapRef.current) mapRef.current = m; }} // set once
                      style={{ height: '100%', width: '100%' }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                      />

                      {/* Store markers (memoized) */}
                      {markerNodes}

                      {/* User location (blue dot + accuracy ring) */}
                      {userPos && (
                        <>
                          <CircleMarker
                            center={userPos}
                            pathOptions={{ color: '#2563EB', fillColor: '#3B82F6', fillOpacity: 0.45 }}
                            radius={8}
                          />
                          {acc && (
                            <CircleMarker
                              center={userPos}
                              radius={Math.max(20, Math.min(120, acc / 3))}
                              pathOptions={{ color: '#3B82F6', opacity: 0.25 }}
                            />
                          )}
                        </>
                      )}
                    </MapContainer>
                  )}

                  {/* Map overlay: Search + Locate */}
                  <div className="absolute left-4 right-4 top-4 flex gap-2">
                    <div className="flex-1">
                      <div className="flex items-stretch bg-white rounded-full shadow-md border border-gray-200 overflow-hidden">
                        <input
                          value={q}
                          onChange={(e) => setQ(e.target.value)}
                          placeholder="Search in Germany (city, street...)"
                          className="w-full px-4 py-2 rounded-l-full focus:outline-none text-sm"
                        />
                        <button
                          onClick={() => runSearch(q)}
                          disabled={searching}
                          className="px-4 py-2 text-sm font-medium bg-main-purple text-white hover:bg-purple-700 disabled:opacity-60"
                        >
                          {searching ? 'Searching…' : 'Search'}
                        </button>
                      </div>

                      {!!results.length && (
                        <div className="mt-2 max-h-56 overflow-auto bg-white border border-gray-200 rounded-xl shadow-lg">
                          {results.map((r, idx) => (
                            <button
                              key={`${r.lat}-${r.lon}-${idx}`}
                              onClick={() => chooseResult(r.lat, r.lon)}
                              className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                            >
                              {r.display_name}
                            </button>
                          ))}
                        </div>
                      )}
                      {searchError && <div className="mt-2 text-xs text-red-600">{searchError}</div>}
                    </div>

                    <button
                      onClick={locateMe}
                      title="Use my location"
                      className={`relative shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-full bg-white border border-gray-200 shadow-md hover:bg-gray-50 ${locating ? 'pulse' : ''}`}
                    >
                      <Crosshair className="w-5 h-5 text-main-purple" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* LIST RIGHT */}
            <div>
              {/* Filters */}
              <div className="mb-4 flex flex-wrap gap-2">
                {(['All', ...partners.map(p => p.name)] as const).map(p => (
                  <button
                    key={p}
                    onClick={() => setSelected(p as PartnerName | 'All')}
                    className={`px-4 py-2 rounded-full text-sm border transition
                      ${selected === p
                        ? 'bg-main-purple text-white border-main-purple'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-main-purple/50'}
                    `}
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                {filteredPartners.map((partner, idx) => (
                  <motion.div
                    key={partner.name}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.05 * idx }}
                    className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition border border-gray-100"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${partner.color} rounded-xl flex items-center justify-center`}>
                          <Store className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{partner.name}</h3>
                          <p className="text-sm text-gray-600">{partner.category}</p>
                          <div className="mt-1 flex items-center gap-1">
                            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                            <span className="text-xs text-gray-600">4.8 • Verified</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-main-purple">{partner.locations}</div>
                        <div className="text-xs text-gray-500">locations</div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => flyToPartner(partner.name)}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-main-purple text-white text-sm hover:bg-purple-700 transition"
                      >
                        <MapPin className="w-4 h-4" /> Show on map
                      </button>
                      <button className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition">
                        <Handshake className="w-4 h-4" /> Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

             {/* CTA row (full width) */}
<div className="mt-8">
  <Link
    href={`/${locale}/become-partner`}
    className="w-full bg-main-purple hover:bg-purple-700 text-white px-6 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2"
  >
    <Handshake className="w-5 h-5" /> Become a Reward Partner
  </Link>
</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
