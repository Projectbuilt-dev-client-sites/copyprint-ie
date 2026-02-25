export interface LocalAttraction {
  name: string;
  url: string;
  doFollow: boolean;
}

export interface AreaData {
  lat: number;
  lng: number;
  attractions: LocalAttraction[];
}

export const areaData: Record<string, AreaData> = {
  "artane": { lat: 53.3837, lng: -6.2117, attractions: [
    { name: "Artane Castle Shopping Centre", url: "https://www.artanecastle.ie/", doFollow: true },
    { name: "Donnycarney Park", url: "https://www.dublin.ie/", doFollow: false },
    { name: "Coolock Library", url: "https://www.dublincity.ie/residential/libraries", doFollow: true },
  ]},
  "ashtown": { lat: 53.3733, lng: -6.3375, attractions: [
    { name: "Ashtown Castle", url: "https://www.phoenixpark.ie/", doFollow: true },
    { name: "Phoenix Park Visitor Centre", url: "https://www.phoenixpark.ie/visitor-centre/", doFollow: true },
    { name: "Farmleigh House", url: "https://www.farmleigh.ie/", doFollow: false },
  ]},
  "ballsbridge": { lat: 53.3283, lng: -6.2283, attractions: [
    { name: "RDS (Royal Dublin Society)", url: "https://www.rds.ie/", doFollow: true },
    { name: "Aviva Stadium", url: "https://www.avivastadium.ie/", doFollow: true },
    { name: "Herbert Park", url: "https://www.dublincity.ie/residential/parks", doFollow: false },
  ]},
  "ballinteer": { lat: 53.2783, lng: -6.2600, attractions: [
    { name: "Marlay Park", url: "https://www.dlrcoco.ie/en/parks/marlay-park", doFollow: true },
    { name: "Ballinteer Community Centre", url: "https://www.ballinteercc.ie/", doFollow: false },
    { name: "Wicklow Way Trailhead", url: "https://www.wicklowway.com/", doFollow: true },
  ]},
  "ballyboden": { lat: 53.2733, lng: -6.2950, attractions: [
    { name: "Ballyboden St Endas GAA", url: "https://www.ballybodenstendas.ie/", doFollow: true },
    { name: "Rathfarnham Castle", url: "https://www.heritageireland.ie/visit/places-to-visit/rathfarnham-castle/", doFollow: true },
    { name: "St Enda's Park", url: "https://www.heritageireland.ie/", doFollow: false },
  ]},
  "ballybrack": { lat: 53.2517, lng: -6.1183, attractions: [
    { name: "Killiney Hill Park", url: "https://www.dlrcoco.ie/en/parks/killiney-hill-park", doFollow: true },
    { name: "Shanganagh Park", url: "https://www.dlrcoco.ie/", doFollow: false },
    { name: "Ballybrack FC", url: "https://www.ballybrackfc.ie/", doFollow: false },
  ]},
  "ballyfermot": { lat: 53.3417, lng: -6.3533, attractions: [
    { name: "Ballyfermot Library", url: "https://www.dublincity.ie/residential/libraries", doFollow: true },
    { name: "Cherry Orchard Park", url: "https://www.dublincity.ie/residential/parks", doFollow: false },
    { name: "BCFE Ballyfermot College", url: "https://www.bcfe.ie/", doFollow: true },
  ]},
  "ballymount": { lat: 53.3100, lng: -6.3467, attractions: [
    { name: "Ballymount Industrial Estate", url: "https://www.sdcc.ie/", doFollow: false },
    { name: "Limekiln Business Park", url: "https://www.sdcc.ie/", doFollow: false },
    { name: "Corkagh Park", url: "https://www.sdcc.ie/en/parks/corkagh-park/", doFollow: true },
  ]},
  "ballymun": { lat: 53.3967, lng: -6.2633, attractions: [
    { name: "DCU (Dublin City University)", url: "https://www.dcu.ie/", doFollow: true },
    { name: "Ballymun Library", url: "https://www.dublincity.ie/residential/libraries", doFollow: false },
    { name: "Axis Arts Centre", url: "https://www.axis-ballymun.ie/", doFollow: true },
  ]},
  "ballyroan": { lat: 53.2867, lng: -6.2750, attractions: [
    { name: "Ballyroan Library", url: "https://www.sdcc.ie/", doFollow: false },
    { name: "Rathfarnham Shopping Centre", url: "https://www.rathfarnhamsc.ie/", doFollow: true },
    { name: "Marlay Park", url: "https://www.dlrcoco.ie/en/parks/marlay-park", doFollow: true },
  ]},
  "bayside": { lat: 53.3883, lng: -6.1400, attractions: [
    { name: "Sutton Park", url: "https://www.fingal.ie/", doFollow: false },
    { name: "Bayside DART Station", url: "https://www.irishrail.ie/", doFollow: true },
    { name: "Baldoyle Estuary", url: "https://www.npws.ie/", doFollow: true },
  ]},
  "beaumont": { lat: 53.3883, lng: -6.2267, attractions: [
    { name: "Beaumont Hospital", url: "https://www.beaumont.ie/", doFollow: true },
    { name: "Beaumont Park", url: "https://www.dublincity.ie/residential/parks", doFollow: false },
    { name: "Northside Shopping Centre", url: "https://www.northsidesc.ie/", doFollow: true },
  ]},
  "blackrock": { lat: 53.3017, lng: -6.1783, attractions: [
    { name: "Blackrock Market", url: "https://www.blackrockmarket.com/", doFollow: true },
    { name: "Blackrock Park", url: "https://www.dlrcoco.ie/", doFollow: false },
    { name: "Blackrock College", url: "https://www.blackrockcollege.com/", doFollow: true },
  ]},
  "blanchardstown": { lat: 53.3883, lng: -6.3783, attractions: [
    { name: "Blanchardstown Shopping Centre", url: "https://www.blanchardstowncentre.com/", doFollow: true },
    { name: "National Aquatic Centre", url: "https://www.nationalaquaticcentre.ie/", doFollow: true },
    { name: "Connolly Hospital", url: "https://www.connollyhospital.ie/", doFollow: false },
  ]},
  "booterstown": { lat: 53.3100, lng: -6.1917, attractions: [
    { name: "Booterstown Marsh", url: "https://www.npws.ie/", doFollow: true },
    { name: "RTÉ Campus", url: "https://www.rte.ie/", doFollow: true },
    { name: "Booterstown DART Station", url: "https://www.irishrail.ie/", doFollow: false },
  ]},
  "broadstone": { lat: 53.3567, lng: -6.2750, attractions: [
    { name: "Broadstone LUAS Stop", url: "https://www.luas.ie/", doFollow: true },
    { name: "King's Inns", url: "https://www.kingsinns.ie/", doFollow: true },
    { name: "Blessington Street Basin", url: "https://www.dublincity.ie/residential/parks", doFollow: false },
  ]},
  "cabinteely": { lat: 53.2617, lng: -6.1600, attractions: [
    { name: "Cabinteely Park", url: "https://www.dlrcoco.ie/en/parks/cabinteely-park", doFollow: true },
    { name: "Cabinteely House", url: "https://www.dlrcoco.ie/", doFollow: false },
    { name: "Brennanstown Riding School", url: "https://www.brennanstownrs.ie/", doFollow: false },
  ]},
  "cabra": { lat: 53.3617, lng: -6.2900, attractions: [
    { name: "Dalymount Park", url: "https://www.bohemianfc.com/", doFollow: true },
    { name: "Cabra Library", url: "https://www.dublincity.ie/residential/libraries", doFollow: false },
    { name: "Phoenix Park (nearby)", url: "https://www.phoenixpark.ie/", doFollow: true },
  ]},
  "carpenterstown": { lat: 53.3783, lng: -6.3950, attractions: [
    { name: "Carpenterstown Community Centre", url: "https://www.fingal.ie/", doFollow: false },
    { name: "Luttrellstown Castle", url: "https://www.luttrellstowncastle.com/", doFollow: true },
    { name: "Castleknock GAA", url: "https://www.castleknockgaa.ie/", doFollow: false },
  ]},
  "castleknock": { lat: 53.3733, lng: -6.3633, attractions: [
    { name: "Phoenix Park", url: "https://www.phoenixpark.ie/", doFollow: true },
    { name: "Castleknock Hotel", url: "https://www.castleknockhotel.com/", doFollow: true },
    { name: "Farmleigh House", url: "https://www.farmleigh.ie/", doFollow: false },
  ]},
  "chapelizod": { lat: 53.3483, lng: -6.3367, attractions: [
    { name: "Irish National War Memorial Gardens", url: "https://www.heritageireland.ie/", doFollow: true },
    { name: "Phoenix Park (nearby)", url: "https://www.phoenixpark.ie/", doFollow: true },
    { name: "Chapelizod Village", url: "https://www.dublin.ie/", doFollow: false },
  ]},
  "cherrywood": { lat: 53.2433, lng: -6.1467, attractions: [
    { name: "Cherrywood Business Park", url: "https://www.dlrcoco.ie/", doFollow: false },
    { name: "Loughlinstown Leisure Centre", url: "https://www.dlrcoco.ie/", doFollow: false },
    { name: "Bride's Glen LUAS", url: "https://www.luas.ie/", doFollow: true },
  ]},
  "christchurch": { lat: 53.3433, lng: -6.2717, attractions: [
    { name: "Christ Church Cathedral", url: "https://www.christchurchcathedral.ie/", doFollow: true },
    { name: "Dublinia", url: "https://www.dublinia.ie/", doFollow: true },
    { name: "Dublin Castle", url: "https://www.dublincastle.ie/", doFollow: false },
  ]},
  "churchtown": { lat: 53.2967, lng: -6.2583, attractions: [
    { name: "Landscape Gardens", url: "https://www.dublincity.ie/residential/parks", doFollow: false },
    { name: "Dundrum Town Centre (nearby)", url: "https://www.dundrum.ie/", doFollow: true },
    { name: "Churchtown Village", url: "https://www.dublin.ie/", doFollow: false },
  ]},
  "citywest": { lat: 53.2833, lng: -6.4150, attractions: [
    { name: "Citywest Hotel & Convention Centre", url: "https://www.citywesthotel.com/", doFollow: true },
    { name: "Citywest Shopping Centre", url: "https://www.sdcc.ie/", doFollow: false },
    { name: "Saggart Village", url: "https://www.sdcc.ie/", doFollow: false },
  ]},
  "clondalkin": { lat: 53.3217, lng: -6.3917, attractions: [
    { name: "Clondalkin Round Tower", url: "https://www.heritageireland.ie/", doFollow: true },
    { name: "The Mill Shopping Centre", url: "https://www.themillsc.ie/", doFollow: true },
    { name: "Corkagh Park", url: "https://www.sdcc.ie/en/parks/corkagh-park/", doFollow: false },
  ]},
  "clonsilla": { lat: 53.3817, lng: -6.4183, attractions: [
    { name: "Clonsilla Railway Station", url: "https://www.irishrail.ie/", doFollow: true },
    { name: "Royal Canal Greenway", url: "https://www.royalcanal.ie/", doFollow: true },
    { name: "Clonsilla Village", url: "https://www.fingal.ie/", doFollow: false },
  ]},
  "clonskeagh": { lat: 53.3150, lng: -6.2367, attractions: [
    { name: "UCD (University College Dublin)", url: "https://www.ucd.ie/", doFollow: true },
    { name: "Smurfit Business School", url: "https://www.smurfitschool.ie/", doFollow: true },
    { name: "Belfield Park", url: "https://www.ucd.ie/", doFollow: false },
  ]},
  "clontarf": { lat: 53.3633, lng: -6.1917, attractions: [
    { name: "Clontarf Promenade", url: "https://www.dublincity.ie/residential/parks", doFollow: false },
    { name: "St Anne's Park", url: "https://www.dublincity.ie/residential/parks/st-annes-park", doFollow: true },
    { name: "Bull Island & Dollymount Strand", url: "https://www.npws.ie/", doFollow: true },
  ]},
  "coolock": { lat: 53.3883, lng: -6.1917, attractions: [
    { name: "Coolock Library", url: "https://www.dublincity.ie/residential/libraries", doFollow: true },
    { name: "Northside Shopping Centre", url: "https://www.northsidesc.ie/", doFollow: true },
    { name: "Stardust Memorial Park", url: "https://www.dublincity.ie/residential/parks", doFollow: false },
  ]},
  "crumlin": { lat: 53.3233, lng: -6.3117, attractions: [
    { name: "Our Lady's Children's Hospital", url: "https://www.olchc.ie/", doFollow: true },
    { name: "Crumlin Shopping Centre", url: "https://www.dublin.ie/", doFollow: false },
    { name: "Sundrive Park", url: "https://www.dublincity.ie/residential/parks", doFollow: false },
  ]},
  "dalkey": { lat: 53.2767, lng: -6.1000, attractions: [
    { name: "Dalkey Castle & Heritage Centre", url: "https://www.dalkeycastle.com/", doFollow: true },
    { name: "Killiney Hill", url: "https://www.dlrcoco.ie/en/parks/killiney-hill-park", doFollow: true },
    { name: "Coliemore Harbour", url: "https://www.dlrcoco.ie/", doFollow: false },
  ]},
  "darndale": { lat: 53.3983, lng: -6.1833, attractions: [
    { name: "Darndale Park", url: "https://www.dublincity.ie/residential/parks", doFollow: false },
    { name: "Darndale/Belcamp Recreation Centre", url: "https://www.dublincity.ie/", doFollow: false },
    { name: "Father Collins Park", url: "https://www.dublincity.ie/residential/parks", doFollow: true },
  ]},
  "dartry": { lat: 53.3150, lng: -6.2617, attractions: [
    { name: "Dartry Park", url: "https://www.dublincity.ie/residential/parks", doFollow: false },
    { name: "Palmerston Park", url: "https://www.dublincity.ie/residential/parks", doFollow: true },
    { name: "Milltown Golf Club", url: "https://www.milltowngolfclub.ie/", doFollow: true },
  ]},
  "deansgrange": { lat: 53.2783, lng: -6.1533, attractions: [
    { name: "Deansgrange Cemetery", url: "https://www.dlrcoco.ie/", doFollow: false },
    { name: "Deansgrange Library", url: "https://www.dlrcoco.ie/en/library-services", doFollow: true },
    { name: "Kill Abbey Ruins", url: "https://www.dlrcoco.ie/", doFollow: false },
  ]},
  "dollymount": { lat: 53.3683, lng: -6.1533, attractions: [
    { name: "Dollymount Strand", url: "https://www.dublincity.ie/residential/parks", doFollow: true },
    { name: "Bull Island Nature Reserve", url: "https://www.npws.ie/", doFollow: true },
    { name: "Royal Dublin Golf Club", url: "https://www.theroyaldublingolfclub.com/", doFollow: false },
  ]},
  "donabate": { lat: 53.4850, lng: -6.1517, attractions: [
    { name: "Newbridge House & Farm", url: "https://newbridgehouseandfarm.com/", doFollow: true },
    { name: "Donabate Beach", url: "https://www.fingal.ie/", doFollow: false },
    { name: "The Island Golf Club", url: "https://www.theislandgolfclub.ie/", doFollow: true },
  ]},
  "donaghmede": { lat: 53.3967, lng: -6.1617, attractions: [
    { name: "Donaghmede Shopping Centre", url: "https://www.donaghmede.ie/", doFollow: true },
    { name: "Fr Collins Park", url: "https://www.dublincity.ie/residential/parks", doFollow: false },
    { name: "Baldoyle Estuary", url: "https://www.npws.ie/", doFollow: true },
  ]},
  "donnybrook": { lat: 53.3217, lng: -6.2317, attractions: [
    { name: "Donnybrook Stadium", url: "https://www.leinsterrugby.ie/", doFollow: true },
    { name: "Herbert Park", url: "https://www.dublincity.ie/residential/parks", doFollow: false },
    { name: "RTÉ Studios", url: "https://www.rte.ie/", doFollow: true },
  ]},
  "donnycarney": { lat: 53.3733, lng: -6.2217, attractions: [
    { name: "Donnycarney Library", url: "https://www.dublincity.ie/residential/libraries", doFollow: true },
    { name: "Donnycarney Park", url: "https://www.dublincity.ie/residential/parks", doFollow: false },
    { name: "Holy Cross Church", url: "https://www.dublin.ie/", doFollow: false },
  ]},
  "drimnagh": { lat: 53.3283, lng: -6.3217, attractions: [
    { name: "Drimnagh Castle", url: "https://www.drimnaghcastle.ie/", doFollow: true },
    { name: "Brickfield Park", url: "https://www.dublincity.ie/residential/parks", doFollow: false },
    { name: "Grand Canal (nearby)", url: "https://www.waterwaysireland.org/", doFollow: true },
  ]},
  "drumcondra": { lat: 53.3700, lng: -6.2567, attractions: [
    { name: "Croke Park Stadium", url: "https://crokepark.ie/", doFollow: true },
    { name: "GAA Museum", url: "https://crokepark.ie/gaa-museum", doFollow: true },
    { name: "DCU All Hallows Campus", url: "https://www.dcu.ie/", doFollow: false },
  ]},
  "dublin-1": { lat: 53.3498, lng: -6.2603, attractions: [
    { name: "The Spire", url: "https://www.dublin.ie/", doFollow: false },
    { name: "GPO (General Post Office)", url: "https://www.gpowitnesshistory.ie/", doFollow: true },
    { name: "Hugh Lane Gallery", url: "https://www.hughlane.ie/", doFollow: true },
  ]},
  "dublin-2": { lat: 53.3389, lng: -6.2595, attractions: [
    { name: "Trinity College Dublin", url: "https://www.tcd.ie/", doFollow: true },
    { name: "National Gallery of Ireland", url: "https://www.nationalgallery.ie/", doFollow: true },
    { name: "St Stephen's Green", url: "https://www.heritageireland.ie/", doFollow: false },
  ]},
  "dublin-4": { lat: 53.3283, lng: -6.2283, attractions: [
    { name: "Aviva Stadium", url: "https://www.avivastadium.ie/", doFollow: true },
    { name: "Merrion Square", url: "https://www.merrionsquare.ie/", doFollow: true },
    { name: "Number Twenty Nine Museum", url: "https://www.esb.ie/", doFollow: false },
  ]},
  "dublin-6": { lat: 53.3167, lng: -6.2667, attractions: [
    { name: "Rathmines Town Hall", url: "https://www.dublincity.ie/", doFollow: false },
    { name: "Swan Leisure Centre", url: "https://www.theswancentre.ie/", doFollow: true },
    { name: "Leinster Cricket Club", url: "https://www.leinstercricketclub.ie/", doFollow: false },
  ]},
  "dublin-7": { lat: 53.3567, lng: -6.2850, attractions: [
    { name: "Smithfield Square", url: "https://www.dublin.ie/", doFollow: false },
    { name: "National Museum Collins Barracks", url: "https://www.museum.ie/en-IE/Museums/Decorative-Arts-History", doFollow: true },
    { name: "Jameson Distillery", url: "https://www.jamesonwhiskey.com/en-IE/visit-us/jameson-distillery-bow-st", doFollow: true },
  ]},
  "dublin-8": { lat: 53.3383, lng: -6.2833, attractions: [
    { name: "Guinness Storehouse", url: "https://www.guinness-storehouse.com/", doFollow: true },
    { name: "Kilmainham Gaol", url: "https://www.kilmainhamgaolmuseum.ie/", doFollow: true },
    { name: "IMMA (Irish Museum of Modern Art)", url: "https://www.imma.ie/", doFollow: false },
  ]},
  "dun-laoghaire": { lat: 53.2933, lng: -6.1350, attractions: [
    { name: "Dun Laoghaire Harbour", url: "https://www.dlharbour.ie/", doFollow: true },
    { name: "dlr LexIcon Library", url: "https://www.dlrcoco.ie/en/library-services/dlr-lexicon", doFollow: true },
    { name: "People's Park", url: "https://www.dlrcoco.ie/", doFollow: false },
  ]},
  "dundrum": { lat: 53.2883, lng: -6.2450, attractions: [
    { name: "Dundrum Town Centre", url: "https://www.dundrum.ie/", doFollow: true },
    { name: "Dundrum Castle", url: "https://www.dlrcoco.ie/", doFollow: false },
    { name: "Airfield Estate", url: "https://www.airfield.ie/", doFollow: true },
  ]},
  "east-wall": { lat: 53.3533, lng: -6.2333, attractions: [
    { name: "3Arena", url: "https://www.3arena.ie/", doFollow: true },
    { name: "East Wall Community Centre", url: "https://www.dublincity.ie/", doFollow: false },
    { name: "Dublin Port", url: "https://www.dublinport.ie/", doFollow: true },
  ]},
  "fairview": { lat: 53.3633, lng: -6.2350, attractions: [
    { name: "Fairview Park", url: "https://www.dublincity.ie/residential/parks", doFollow: true },
    { name: "Fairview Cinema", url: "https://www.dublin.ie/", doFollow: false },
    { name: "Marino Casino (nearby)", url: "https://www.heritageireland.ie/", doFollow: true },
  ]},
  "finglas": { lat: 53.3917, lng: -6.2983, attractions: [
    { name: "Finglas Library", url: "https://www.dublincity.ie/residential/libraries", doFollow: true },
    { name: "Tolka Valley Park", url: "https://www.dublincity.ie/residential/parks", doFollow: false },
    { name: "Glasnevin Cemetery (nearby)", url: "https://www.glasnevintrust.ie/", doFollow: true },
  ]},
  "firhouse": { lat: 53.2817, lng: -6.3283, attractions: [
    { name: "Dodder Valley Park", url: "https://www.sdcc.ie/", doFollow: true },
    { name: "Firhouse Community Centre", url: "https://www.sdcc.ie/", doFollow: false },
    { name: "Ballycullen Park", url: "https://www.sdcc.ie/", doFollow: false },
  ]},
  "foxrock": { lat: 53.2717, lng: -6.1783, attractions: [
    { name: "Foxrock Golf Club", url: "https://www.foxrockgolfclub.com/", doFollow: true },
    { name: "Leopardstown Racecourse (nearby)", url: "https://www.leopardstown.com/", doFollow: true },
    { name: "Foxrock Village", url: "https://www.dlrcoco.ie/", doFollow: false },
  ]},
  "glasnevin": { lat: 53.3717, lng: -6.2700, attractions: [
    { name: "Glasnevin Cemetery & Museum", url: "https://www.glasnevintrust.ie/", doFollow: true },
    { name: "National Botanic Gardens", url: "https://botanicgardens.ie/", doFollow: true },
    { name: "Croke Park (nearby)", url: "https://crokepark.ie/", doFollow: false },
  ]},
  "glasthule": { lat: 53.2883, lng: -6.1250, attractions: [
    { name: "Glasthule Village", url: "https://www.dlrcoco.ie/", doFollow: false },
    { name: "Sandycove Beach", url: "https://www.dlrcoco.ie/", doFollow: false },
    { name: "James Joyce Tower", url: "https://joycetower.ie/", doFollow: true },
  ]},
  "goatstown": { lat: 53.2983, lng: -6.2267, attractions: [
    { name: "UCD (nearby)", url: "https://www.ucd.ie/", doFollow: true },
    { name: "Goatstown Village", url: "https://www.dublin.ie/", doFollow: false },
    { name: "Knockrabo Park", url: "https://www.dlrcoco.ie/", doFollow: false },
  ]},
  "grangegorman": { lat: 53.3567, lng: -6.2817, attractions: [
    { name: "TU Dublin Grangegorman", url: "https://www.tudublin.ie/", doFollow: true },
    { name: "Grangegorman Campus", url: "https://ggda.ie/", doFollow: true },
    { name: "Blessington Street Basin (nearby)", url: "https://www.dublincity.ie/residential/parks", doFollow: false },
  ]},
  "harolds-cross": { lat: 53.3267, lng: -6.2800, attractions: [
    { name: "Harold's Cross Park", url: "https://www.dublincity.ie/residential/parks", doFollow: true },
    { name: "Our Lady's Hospice", url: "https://www.olh.ie/", doFollow: true },
    { name: "Grand Canal Walk", url: "https://www.waterwaysireland.org/", doFollow: false },
  ]},
  "howth": { lat: 53.3867, lng: -6.0650, attractions: [
    { name: "Howth Cliff Walk", url: "https://www.howthcliffwalk.com/", doFollow: true },
    { name: "Howth Castle", url: "https://www.howthcastle.ie/", doFollow: true },
    { name: "National Transport Museum", url: "https://www.nationaltransportmuseum.org/", doFollow: false },
  ]},
  "inchicore": { lat: 53.3383, lng: -6.3117, attractions: [
    { name: "Richmond Park (St Patrick's Athletic)", url: "https://www.stpatsfc.com/", doFollow: true },
    { name: "Kilmainham Gaol (nearby)", url: "https://www.kilmainhamgaolmuseum.ie/", doFollow: true },
    { name: "Goldenbridge Cemetery", url: "https://www.dublin.ie/", doFollow: false },
  ]},
  "irishtown": { lat: 53.3383, lng: -6.2117, attractions: [
    { name: "Irishtown Nature Park", url: "https://www.dublincity.ie/residential/parks", doFollow: true },
    { name: "Ringsend Park", url: "https://www.dublincity.ie/residential/parks", doFollow: false },
    { name: "Shelbourne Park Greyhound Stadium", url: "https://www.igb.ie/", doFollow: false },
  ]},
  "islandbridge": { lat: 53.3450, lng: -6.3100, attractions: [
    { name: "War Memorial Gardens", url: "https://www.heritageireland.ie/", doFollow: true },
    { name: "Phoenix Park (nearby)", url: "https://www.phoenixpark.ie/", doFollow: true },
    { name: "Islandbridge GAA Grounds", url: "https://www.dublin.ie/", doFollow: false },
  ]},
  "jobstown": { lat: 53.2800, lng: -6.3700, attractions: [
    { name: "Jobstown Community Centre", url: "https://www.sdcc.ie/", doFollow: false },
    { name: "Tallaght Stadium (nearby)", url: "https://www.tallaghtstadium.ie/", doFollow: true },
    { name: "Sean Walsh Park", url: "https://www.sdcc.ie/", doFollow: false },
  ]},
  "kilbarrack": { lat: 53.3817, lng: -6.1517, attractions: [
    { name: "Kilbarrack Library", url: "https://www.dublincity.ie/residential/libraries", doFollow: true },
    { name: "Kilbarrack DART Station", url: "https://www.irishrail.ie/", doFollow: false },
    { name: "St Anne's Park (nearby)", url: "https://www.dublincity.ie/residential/parks/st-annes-park", doFollow: true },
  ]},
  "kill-o-the-grange": { lat: 53.2767, lng: -6.1500, attractions: [
    { name: "Kill O' The Grange Cemetery", url: "https://www.dlrcoco.ie/", doFollow: false },
    { name: "Cabinteely Park (nearby)", url: "https://www.dlrcoco.ie/en/parks/cabinteely-park", doFollow: true },
    { name: "Cornelscourt Shopping Centre", url: "https://www.dublin.ie/", doFollow: false },
  ]},
  "killiney": { lat: 53.2633, lng: -6.1083, attractions: [
    { name: "Killiney Hill Park", url: "https://www.dlrcoco.ie/en/parks/killiney-hill-park", doFollow: true },
    { name: "Killiney Beach", url: "https://www.dlrcoco.ie/", doFollow: false },
    { name: "Vico Road Walk", url: "https://www.dlrcoco.ie/", doFollow: true },
  ]},
  "killester": { lat: 53.3700, lng: -6.2050, attractions: [
    { name: "St Anne's Park", url: "https://www.dublincity.ie/residential/parks/st-annes-park", doFollow: true },
    { name: "Killester DART Station", url: "https://www.irishrail.ie/", doFollow: false },
    { name: "Clontarf Golf Club", url: "https://www.clontarfgolfclub.ie/", doFollow: true },
  ]},
  "kilmacud": { lat: 53.2883, lng: -6.2117, attractions: [
    { name: "Kilmacud Crokes GAA", url: "https://www.kilmacudcrokes.com/", doFollow: true },
    { name: "Stillorgan Village (nearby)", url: "https://www.dlrcoco.ie/", doFollow: false },
    { name: "Stillorgan Shopping Centre", url: "https://www.stillorgansc.ie/", doFollow: true },
  ]},
  "kilmainham": { lat: 53.3417, lng: -6.3050, attractions: [
    { name: "Kilmainham Gaol", url: "https://www.kilmainhamgaolmuseum.ie/", doFollow: true },
    { name: "IMMA (Royal Hospital)", url: "https://www.imma.ie/", doFollow: true },
    { name: "Bully's Acre Cemetery", url: "https://www.dublin.ie/", doFollow: false },
  ]},
  "kilnamanagh": { lat: 53.2933, lng: -6.3567, attractions: [
    { name: "Kilnamanagh Shopping Centre", url: "https://www.sdcc.ie/", doFollow: false },
    { name: "Tymon Park", url: "https://www.sdcc.ie/", doFollow: true },
    { name: "Tallaght Stadium (nearby)", url: "https://www.tallaghtstadium.ie/", doFollow: false },
  ]},
  "kimmage": { lat: 53.3167, lng: -6.2950, attractions: [
    { name: "Kimmage Village", url: "https://www.dublin.ie/", doFollow: false },
    { name: "Sundrive Park", url: "https://www.dublincity.ie/residential/parks", doFollow: true },
    { name: "Eamonn Ceannt Park", url: "https://www.dublincity.ie/residential/parks", doFollow: false },
  ]},
  "kinsealy": { lat: 53.4267, lng: -6.1700, attractions: [
    { name: "Malahide Castle (nearby)", url: "https://www.malahidecastleandgardens.ie/", doFollow: true },
    { name: "Kinsealy Garden Centre", url: "https://www.fingal.ie/", doFollow: false },
    { name: "Portmarnock Beach (nearby)", url: "https://www.fingal.ie/", doFollow: false },
  ]},
  "knocklyon": { lat: 53.2833, lng: -6.3117, attractions: [
    { name: "Knocklyon Shopping Centre", url: "https://www.sdcc.ie/", doFollow: false },
    { name: "Ballycullen Park", url: "https://www.sdcc.ie/", doFollow: true },
    { name: "Knocklyon Community Centre", url: "https://www.sdcc.ie/", doFollow: false },
  ]},
  "leopardstown": { lat: 53.2700, lng: -6.2050, attractions: [
    { name: "Leopardstown Racecourse", url: "https://www.leopardstown.com/", doFollow: true },
    { name: "Leopardstown Business Park", url: "https://www.dlrcoco.ie/", doFollow: false },
    { name: "Central Park LUAS", url: "https://www.luas.ie/", doFollow: true },
  ]},
  "liffey-valley": { lat: 53.3433, lng: -6.3900, attractions: [
    { name: "Liffey Valley Shopping Centre", url: "https://www.liffeyvalley.ie/", doFollow: true },
    { name: "Fonthill Retail Park", url: "https://www.sdcc.ie/", doFollow: false },
    { name: "Waterstown Park", url: "https://www.sdcc.ie/", doFollow: false },
  ]},
  "lucan": { lat: 53.3567, lng: -6.4483, attractions: [
    { name: "Lucan Village", url: "https://www.sdcc.ie/", doFollow: false },
    { name: "Griffeen Valley Park", url: "https://www.sdcc.ie/", doFollow: true },
    { name: "Lucan Spa Hotel", url: "https://www.lucanspahotel.ie/", doFollow: true },
  ]},
  "lusk": { lat: 53.5267, lng: -6.1667, attractions: [
    { name: "Lusk Round Tower", url: "https://www.fingal.ie/", doFollow: true },
    { name: "Lusk Heritage Centre", url: "https://www.fingal.ie/", doFollow: false },
    { name: "Rush Beach (nearby)", url: "https://www.fingal.ie/", doFollow: false },
  ]},
  "malahide": { lat: 53.4500, lng: -6.1533, attractions: [
    { name: "Malahide Castle & Gardens", url: "https://www.malahidecastleandgardens.ie/", doFollow: true },
    { name: "Malahide Marina", url: "https://www.malahidemarina.ie/", doFollow: true },
    { name: "Malahide Beach", url: "https://www.fingal.ie/", doFollow: false },
  ]},
  "marino": { lat: 53.3667, lng: -6.2383, attractions: [
    { name: "Casino at Marino", url: "https://www.heritageireland.ie/visit/places-to-visit/casino-model-railway-museum/", doFollow: true },
    { name: "Marino Library", url: "https://www.dublincity.ie/residential/libraries", doFollow: false },
    { name: "Griffith Park", url: "https://www.dublincity.ie/residential/parks", doFollow: false },
  ]},
  "merrion": { lat: 53.3200, lng: -6.2117, attractions: [
    { name: "Merrion Square", url: "https://www.merrionsquare.ie/", doFollow: true },
    { name: "National Gallery of Ireland", url: "https://www.nationalgallery.ie/", doFollow: true },
    { name: "Government Buildings", url: "https://www.gov.ie/", doFollow: false },
  ]},
  "milltown": { lat: 53.3100, lng: -6.2500, attractions: [
    { name: "Milltown Golf Club", url: "https://www.milltowngolfclub.ie/", doFollow: true },
    { name: "Dodder Valley Walk", url: "https://www.dublincity.ie/residential/parks", doFollow: false },
    { name: "Milltown LUAS Stop", url: "https://www.luas.ie/", doFollow: true },
  ]},
  "monkstown": { lat: 53.2917, lng: -6.1533, attractions: [
    { name: "Monkstown Village", url: "https://www.dlrcoco.ie/", doFollow: false },
    { name: "Salthill & Monkstown DART", url: "https://www.irishrail.ie/", doFollow: true },
    { name: "Lambert Puppet Theatre", url: "https://www.lambertpuppettheatre.ie/", doFollow: true },
  ]},
  "mount-merrion": { lat: 53.2967, lng: -6.2100, attractions: [
    { name: "Mount Merrion Parish", url: "https://www.mountmerrionparish.ie/", doFollow: false },
    { name: "Deerpark (Mount Merrion)", url: "https://www.dlrcoco.ie/", doFollow: false },
    { name: "UCD (nearby)", url: "https://www.ucd.ie/", doFollow: true },
  ]},
  "mulhuddart": { lat: 53.3933, lng: -6.3950, attractions: [
    { name: "Mulhuddart Community Centre", url: "https://www.fingal.ie/", doFollow: false },
    { name: "Tyrrelstown Town Centre", url: "https://www.fingal.ie/", doFollow: false },
    { name: "Blanchardstown Centre (nearby)", url: "https://www.blanchardstowncentre.com/", doFollow: true },
  ]},
  "naul": { lat: 53.5867, lng: -6.2833, attractions: [
    { name: "Seamus Ennis Arts Centre", url: "https://www.seamusenniscentre.com/", doFollow: true },
    { name: "Naul Village", url: "https://www.fingal.ie/", doFollow: false },
    { name: "Fourknocks Passage Tomb", url: "https://www.heritageireland.ie/", doFollow: true },
  ]},
  "north-wall": { lat: 53.3500, lng: -6.2367, attractions: [
    { name: "3Arena", url: "https://www.3arena.ie/", doFollow: true },
    { name: "IFSC (Financial Centre)", url: "https://www.dublin.ie/", doFollow: false },
    { name: "Convention Centre Dublin", url: "https://www.theccd.ie/", doFollow: true },
  ]},
  "ongar": { lat: 53.3917, lng: -6.4317, attractions: [
    { name: "Ongar Village", url: "https://www.fingal.ie/", doFollow: false },
    { name: "Hartstown Community Centre", url: "https://www.fingal.ie/", doFollow: false },
    { name: "Blanchardstown Centre (nearby)", url: "https://www.blanchardstowncentre.com/", doFollow: true },
  ]},
  "palmerstown": { lat: 53.3483, lng: -6.3717, attractions: [
    { name: "Palmerstown Village", url: "https://www.sdcc.ie/", doFollow: false },
    { name: "Waterstown Park", url: "https://www.sdcc.ie/", doFollow: true },
    { name: "Liffey Valley Centre (nearby)", url: "https://www.liffeyvalley.ie/", doFollow: true },
  ]},
  "phibsborough": { lat: 53.3600, lng: -6.2717, attractions: [
    { name: "Dalymount Park", url: "https://www.bohemianfc.com/", doFollow: true },
    { name: "Phibsborough Shopping Centre", url: "https://www.dublin.ie/", doFollow: false },
    { name: "Royal Canal Walk", url: "https://www.waterwaysireland.org/", doFollow: true },
  ]},
  "portmarnock": { lat: 53.4267, lng: -6.1367, attractions: [
    { name: "Portmarnock Beach", url: "https://www.fingal.ie/", doFollow: true },
    { name: "Portmarnock Golf Club", url: "https://www.portmarnockgolfclub.ie/", doFollow: true },
    { name: "Velvet Strand", url: "https://www.fingal.ie/", doFollow: false },
  ]},
  "portobello": { lat: 53.3317, lng: -6.2683, attractions: [
    { name: "Portobello Bridge (Grand Canal)", url: "https://www.waterwaysireland.org/", doFollow: true },
    { name: "The Bernard Shaw (nearby)", url: "https://www.dublin.ie/", doFollow: false },
    { name: "Leonard's Corner", url: "https://www.dublin.ie/", doFollow: false },
  ]},
  "raheny": { lat: 53.3800, lng: -6.1717, attractions: [
    { name: "St Anne's Park & Rose Garden", url: "https://www.dublincity.ie/residential/parks/st-annes-park", doFollow: true },
    { name: "Raheny Library", url: "https://www.dublincity.ie/residential/libraries", doFollow: false },
    { name: "North Bull Island", url: "https://www.npws.ie/", doFollow: true },
  ]},
  "ranelagh": { lat: 53.3267, lng: -6.2583, attractions: [
    { name: "Ranelagh Gardens Park", url: "https://www.dublincity.ie/residential/parks", doFollow: true },
    { name: "Ranelagh Village", url: "https://www.dublin.ie/", doFollow: false },
    { name: "Luas Ranelagh Stop", url: "https://www.luas.ie/", doFollow: true },
  ]},
  "rathcoole": { lat: 53.2833, lng: -6.4617, attractions: [
    { name: "Rathcoole Village", url: "https://www.sdcc.ie/", doFollow: false },
    { name: "Avon Riding School", url: "https://www.sdcc.ie/", doFollow: false },
    { name: "Newcastle (nearby)", url: "https://www.sdcc.ie/", doFollow: false },
  ]},
  "rathfarnham": { lat: 53.2983, lng: -6.2900, attractions: [
    { name: "Rathfarnham Castle", url: "https://www.heritageireland.ie/visit/places-to-visit/rathfarnham-castle/", doFollow: true },
    { name: "St Enda's Park (Pearse Museum)", url: "https://www.heritageireland.ie/", doFollow: true },
    { name: "Marlay Park (nearby)", url: "https://www.dlrcoco.ie/en/parks/marlay-park", doFollow: false },
  ]},
  "rathgar": { lat: 53.3150, lng: -6.2717, attractions: [
    { name: "Rathgar Village", url: "https://www.dublin.ie/", doFollow: false },
    { name: "Herzog Park", url: "https://www.dublincity.ie/residential/parks", doFollow: true },
    { name: "Church of the Three Patrons", url: "https://www.dublin.ie/", doFollow: false },
  ]},
  "rathmines": { lat: 53.3233, lng: -6.2633, attractions: [
    { name: "Rathmines Library", url: "https://www.dublincity.ie/residential/libraries", doFollow: true },
    { name: "Rathmines Town Hall", url: "https://www.dublincity.ie/", doFollow: false },
    { name: "Church of Mary Immaculate", url: "https://www.dublin.ie/", doFollow: false },
  ]},
  "rialto": { lat: 53.3333, lng: -6.2917, attractions: [
    { name: "Rialto LUAS Stop", url: "https://www.luas.ie/", doFollow: true },
    { name: "Grand Canal (Rialto)", url: "https://www.waterwaysireland.org/", doFollow: true },
    { name: "Dolphin Park", url: "https://www.dublincity.ie/residential/parks", doFollow: false },
  ]},
  "ringsend": { lat: 53.3383, lng: -6.2200, attractions: [
    { name: "Ringsend Park", url: "https://www.dublincity.ie/residential/parks", doFollow: true },
    { name: "Poolbeg Chimneys", url: "https://www.dublin.ie/", doFollow: false },
    { name: "Irishtown Nature Park", url: "https://www.dublincity.ie/residential/parks", doFollow: true },
  ]},
  "rush": { lat: 53.5217, lng: -6.0917, attractions: [
    { name: "Rush South Beach", url: "https://www.fingal.ie/", doFollow: true },
    { name: "Rush Harbour", url: "https://www.fingal.ie/", doFollow: false },
    { name: "Skerries Mills (nearby)", url: "https://www.skerriesmills.ie/", doFollow: true },
  ]},
  "saggart": { lat: 53.2833, lng: -6.4317, attractions: [
    { name: "Citywest Hotel (nearby)", url: "https://www.citywesthotel.com/", doFollow: true },
    { name: "Saggart Village", url: "https://www.sdcc.ie/", doFollow: false },
    { name: "Red LUAS Line Terminus", url: "https://www.luas.ie/", doFollow: true },
  ]},
  "sandyford": { lat: 53.2767, lng: -6.2167, attractions: [
    { name: "Sandyford Business District", url: "https://www.dlrcoco.ie/", doFollow: false },
    { name: "Dundrum Town Centre (nearby)", url: "https://www.dundrum.ie/", doFollow: true },
    { name: "Sandyford LUAS Stop", url: "https://www.luas.ie/", doFollow: true },
  ]},
  "sandymount": { lat: 53.3317, lng: -6.2117, attractions: [
    { name: "Sandymount Strand", url: "https://www.dublincity.ie/residential/parks", doFollow: true },
    { name: "Sandymount Village", url: "https://www.dublin.ie/", doFollow: false },
    { name: "Star of the Sea Church", url: "https://www.dublin.ie/", doFollow: false },
  ]},
  "santry": { lat: 53.3933, lng: -6.2467, attractions: [
    { name: "Morton Stadium", url: "https://www.dublincity.ie/", doFollow: false },
    { name: "Santry Demesne Park", url: "https://www.dublincity.ie/residential/parks", doFollow: true },
    { name: "DCU (nearby)", url: "https://www.dcu.ie/", doFollow: true },
  ]},
  "shankill": { lat: 53.2333, lng: -6.1200, attractions: [
    { name: "Shanganagh Park", url: "https://www.dlrcoco.ie/", doFollow: true },
    { name: "Shankill Village", url: "https://www.dlrcoco.ie/", doFollow: false },
    { name: "Brady's Pub Shankill", url: "https://www.dublin.ie/", doFollow: false },
  ]},
  "skerries": { lat: 53.5817, lng: -6.1083, attractions: [
    { name: "Skerries Mills", url: "https://www.skerriesmills.ie/", doFollow: true },
    { name: "Skerries Harbour", url: "https://www.fingal.ie/", doFollow: false },
    { name: "Ardgillan Castle & Demesne", url: "https://www.ardgillancastle.ie/", doFollow: true },
  ]},
  "smithfield": { lat: 53.3483, lng: -6.2783, attractions: [
    { name: "Jameson Distillery Bow St", url: "https://www.jamesonwhiskey.com/en-IE/visit-us/jameson-distillery-bow-st", doFollow: true },
    { name: "Smithfield Square", url: "https://www.dublin.ie/", doFollow: false },
    { name: "Lighthouse Cinema", url: "https://www.lighthousecinema.ie/", doFollow: true },
  ]},
  "stepaside": { lat: 53.2583, lng: -6.2017, attractions: [
    { name: "The Step Inn Pub", url: "https://www.dublin.ie/", doFollow: false },
    { name: "Stepaside Golf Course", url: "https://www.stepasidegolf.ie/", doFollow: true },
    { name: "Fernhill Gardens", url: "https://www.dlrcoco.ie/", doFollow: false },
  ]},
  "stillorgan": { lat: 53.2883, lng: -6.1950, attractions: [
    { name: "Stillorgan Shopping Centre", url: "https://www.stillorgansc.ie/", doFollow: true },
    { name: "Stillorgan Park", url: "https://www.dlrcoco.ie/", doFollow: false },
    { name: "UCD (nearby)", url: "https://www.ucd.ie/", doFollow: true },
  ]},
  "stoneybatter": { lat: 53.3533, lng: -6.2850, attractions: [
    { name: "Stoneybatter Village", url: "https://www.dublin.ie/", doFollow: false },
    { name: "Arbour Hill Cemetery", url: "https://www.heritageireland.ie/", doFollow: true },
    { name: "Collins Barracks Museum", url: "https://www.museum.ie/en-IE/Museums/Decorative-Arts-History", doFollow: true },
  ]},
  "sutton": { lat: 53.3900, lng: -6.1083, attractions: [
    { name: "Sutton Cross", url: "https://www.fingal.ie/", doFollow: false },
    { name: "Howth Head (nearby)", url: "https://www.howthcliffwalk.com/", doFollow: true },
    { name: "Sutton DART Station", url: "https://www.irishrail.ie/", doFollow: true },
  ]},
  "swords": { lat: 53.4597, lng: -6.2181, attractions: [
    { name: "Swords Castle", url: "https://www.fingal.ie/swords-castle", doFollow: true },
    { name: "Pavilions Shopping Centre", url: "https://www.pavilions.ie/", doFollow: true },
    { name: "Dublin Airport (nearby)", url: "https://www.dublinairport.com/", doFollow: false },
  ]},
  "tallaght": { lat: 53.2867, lng: -6.3533, attractions: [
    { name: "The Square Tallaght", url: "https://www.thesquaretallaght.ie/", doFollow: true },
    { name: "Tallaght Stadium", url: "https://www.tallaghtstadium.ie/", doFollow: true },
    { name: "TU Dublin Tallaght Campus", url: "https://www.tudublin.ie/", doFollow: false },
  ]},
  "templeogue": { lat: 53.3033, lng: -6.3100, attractions: [
    { name: "Templeogue Village", url: "https://www.sdcc.ie/", doFollow: false },
    { name: "Bushy Park", url: "https://www.sdcc.ie/", doFollow: true },
    { name: "Cypress Recreation Centre", url: "https://www.sdcc.ie/", doFollow: false },
  ]},
  "terenure": { lat: 53.3100, lng: -6.2833, attractions: [
    { name: "Terenure College", url: "https://www.terenurecollege.ie/", doFollow: true },
    { name: "Bushy Park", url: "https://www.sdcc.ie/", doFollow: true },
    { name: "Terenure Village", url: "https://www.dublin.ie/", doFollow: false },
  ]},
  "the-liberties": { lat: 53.3400, lng: -6.2783, attractions: [
    { name: "Guinness Storehouse", url: "https://www.guinness-storehouse.com/", doFollow: true },
    { name: "St Patrick's Cathedral", url: "https://www.stpatrickscathedral.ie/", doFollow: true },
    { name: "Digital Hub", url: "https://www.thedigitalhub.com/", doFollow: false },
  ]},
  "tyrrelstown": { lat: 53.4017, lng: -6.3900, attractions: [
    { name: "Tyrrelstown Town Centre", url: "https://www.fingal.ie/", doFollow: false },
    { name: "Tyrrelstown Community Centre", url: "https://www.fingal.ie/", doFollow: false },
    { name: "Blanchardstown Centre (nearby)", url: "https://www.blanchardstowncentre.com/", doFollow: true },
  ]},
};
