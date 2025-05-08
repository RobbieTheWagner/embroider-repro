/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { LinkTo } from '@ember/routing';
import { assert } from '@ember/debug';
import {
  dependencySatisfies,
  importSync,
  macroCondition,
} from '@embroider/macros';

export function repro(isRouteExternal?: boolean): typeof LinkTo {
  if (isRouteExternal) {
    if (macroCondition(dependencySatisfies('ember-engines', '*'))) {
      // @ts-expect-error: shape is unknown
      return importSync('ember-engines/components/link-to-external-component')
        .default as LinkTo;
    } else {
      assert(
        `@isRouteExternal is only available when using the "ember-engines" addon. Please install it to use this feature.`,
        false,
      );
    }
  }

  return LinkTo;
}
