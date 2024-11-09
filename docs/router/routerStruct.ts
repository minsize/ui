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
}

export enum pages {
  STARTUP = "/",
  APP = "/home",
  PROFILE = "/profile",
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
    },
  },
  {
    viewId: views.APP,
    panels: {
      [pages.APP]: panels.APP,
    },
  },
]
