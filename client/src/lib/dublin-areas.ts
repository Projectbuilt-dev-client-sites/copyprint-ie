export interface DublinArea {
  name: string;
  slug: string;
}

export const dublinAreas: DublinArea[] = [
  "Artane", "Ashtown", "Ballsbridge", "Ballinteer", "Ballyboden", "Ballybrack",
  "Ballyfermot", "Ballymount", "Ballymun", "Ballyroan", "Bayside", "Beaumont",
  "Blackrock", "Blanchardstown", "Booterstown", "Broadstone", "Cabinteely", "Cabra",
  "Carpenterstown", "Castleknock", "Chapelizod", "Cherrywood", "Christchurch",
  "Churchtown", "Citywest", "Clondalkin", "Clonsilla", "Clonskeagh", "Clontarf",
  "Coolock", "Crumlin", "Dalkey", "Darndale", "Dartry", "Deansgrange",
  "Dollymount", "Donabate", "Donaghmede", "Donnybrook", "Donnycarney",
  "Drimnagh", "Drumcondra", "Dublin 1", "Dublin 2", "Dublin 4", "Dublin 6",
  "Dublin 7", "Dublin 8", "Dun Laoghaire", "Dundrum", "East Wall", "Fairview",
  "Finglas", "Firhouse", "Foxrock", "Glasnevin", "Glasthule", "Goatstown",
  "Grangegorman", "Harolds Cross", "Howth", "Inchicore", "Irishtown", "Islandbridge",
  "Jobstown", "Kilbarrack", "Kill O The Grange", "Killiney", "Killester",
  "Kilmacud", "Kilmainham", "Kilnamanagh", "Kimmage", "Kinsealy", "Knocklyon",
  "Leopardstown", "Liffey Valley", "Lucan", "Lusk", "Malahide", "Marino",
  "Merrion", "Milltown", "Monkstown", "Mount Merrion", "Mulhuddart", "Naul",
  "North Wall", "Ongar", "Palmerstown", "Phibsborough", "Portmarnock",
  "Portobello", "Raheny", "Ranelagh", "Rathcoole", "Rathfarnham", "Rathgar",
  "Rathmines", "Rialto", "Ringsend", "Rush", "Saggart", "Sandyford",
  "Sandymount", "Santry", "Shankill", "Skerries", "Smithfield", "Stepaside",
  "Stillorgan", "Stoneybatter", "Sutton", "Swords", "Tallaght", "Templeogue",
  "Terenure", "The Liberties", "Tyrrelstown"
].map(name => ({
  name,
  slug: name.toLowerCase().replace(/\s+/g, "-").replace(/'/g, ""),
}));

export const localServices = [
  {
    slug: "business-cards",
    name: "Business Cards",
    parentSlug: "business-cards",
  },
  {
    slug: "flyers-and-leaflets",
    name: "Flyers and Leaflets",
    parentSlug: "flyers-leaflets",
  },
  {
    slug: "posters",
    name: "Posters",
    parentSlug: "posters",
  },
  {
    slug: "roller-banners",
    name: "Roller Banners",
    parentSlug: "roller-banners",
  },
  {
    slug: "business-stationery",
    name: "Business Stationery",
    parentSlug: "business-stationery",
  },
  {
    slug: "restaurant-printing",
    name: "Restaurant Printing",
    parentSlug: "restaurant-printing",
  },
];
