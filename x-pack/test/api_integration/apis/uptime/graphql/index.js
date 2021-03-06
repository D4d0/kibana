/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

export default function ({ getService, loadTestFile }) {
  const esArchiver = getService('esArchiver');
  const archive = 'uptime/full_heartbeat';

  describe('graphql', () => {
    before('load heartbeat data', () => esArchiver.load(archive));
    after('unload heartbeat index', () => esArchiver.unload(archive));
    // each of these test files imports a GQL query from
    // the uptime app and runs it against the live HTTP server,
    // verifying the pre-loaded documents are returned in a way that
    // matches the snapshots contained in './fixtures'
    loadTestFile(require.resolve('./doc_count'));
    loadTestFile(require.resolve('./error_list'));
    loadTestFile(require.resolve('./filter_bar'));
    loadTestFile(require.resolve('./monitor_list'));
    loadTestFile(require.resolve('./monitor_status_bar'));
    loadTestFile(require.resolve('./ping_list'));
    loadTestFile(require.resolve('./snapshot'));
  });
}
