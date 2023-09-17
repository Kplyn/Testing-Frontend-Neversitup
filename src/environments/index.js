import { local } from './local'
import { dev } from './dev'
import { uat } from './uat'
import { production } from './production'
export const config =
  process.env.REACT_APP_ENV === 'prod'
    ? production
    : process.env.REACT_APP_ENV === 'uat'
    ? uat
    : process.env.REACT_APP_ENV === 'dev'
    ? dev
    : process.env.REACT_APP_ENV === 'prototype'
    ? dev
    : local
