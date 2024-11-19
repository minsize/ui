type RouterStruct = {
  viewId: string
  panels: Record<string, string>
}[]

export enum views {
  STARTUP = "view_startup",
  APP = "view_app",
  PROFILE = "view_profile",
}

export enum panels {
  STARTUP = "panel_startup",
  APP = "panel_home",
  PROFILE = "panel_profile",
  PROFILE_2 = "panel_profile_2",
  PROFILE_3 = "panel_profile_3",
}

export enum pages {
  STARTUP = "/",
  APP = "/home",
  PROFILE = "/profile",
  PROFILE_2 = "/profile_2",
  PROFILE_3 = "/profile_3",
}

export const routerStruct: RouterStruct = [
  {
    viewId: views.STARTUP,
    panels: {
      [pages.STARTUP]: panels.STARTUP,
    },
  },
  {
    viewId: views.PROFILE,
    panels: {
      [pages.PROFILE]: panels.PROFILE,
      [pages.PROFILE_2]: panels.PROFILE_2,
      [pages.PROFILE_3]: panels.PROFILE_3,
    },
  },
  {
    viewId: views.APP,
    panels: {
      [pages.APP]: panels.APP,
    },
  },
]
