// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance, Module, Surface} from 'react-360-web';

function init(bundle, parent, options = {}) {
  r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    nativeModules: [
      new surfaceModule(),
    ],
    ...options,
  });

  introPanel = new Surface(
    500, /* width */
    400, /* height */
    Surface.SurfaceShape.Cylinder /* shape */
  );

  introRoot = r360.renderToSurface(
    r360.createRoot('VRTourApp', { /* initial props */ }),
    introPanel
  );

  apartmentPanel = new Surface(
    100,
    100,
    Surface.SurfaceShape.Flat
  )

  apartmentPanel.setAngle(
    0.2, /* yaw angle */
    0 /* pitch angle */
  );

  bedroomPanel = new Surface(
    100,
    100,
    Surface.SurfaceShape.Flat
  )

  bedroomPanel.setAngle(
    Math.PI / 2, /* yaw angle */
    0 /* pitch angle */
  );

  kitchenPanel = new Surface(
    100,
    100,
    Surface.SurfaceShape.Flat
  )

  kitchenPanel.setAngle(
    -Math.PI / 2, /* yaw angle */
    0 /* pitch angle */
  );

  livingRoomPanel = new Surface(
    100,
    100,
    Surface.SurfaceShape.Flat
  );

  livingRoomPanel.setAngle(
    3.6, /* yaw angle */
    0 /* pitch angle */
  );

  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL('apartment.jpg'));
}

class surfaceModule extends Module {
  constructor() {
    super('surfaceModule');
  }

  resizeSurface(width, height, id) {
    if (id === 'bedroom') {
      bedroomPanel.resize(width, height);
    } else if (id === 'kitchen') {
      kitchenPanel.resize(width, height);
    } else if (id === 'livingRoom') {
      livingRoomPanel.resize(width, height);
    } else if (id === 'apartment') {
      apartmentPanel.resize(width, height);
    }
  }

  start() {
    r360.renderToSurface(
      r360.createRoot('InfoPanel', { id: 'apartment',
                                     text: 'Browse our incredible interiors.' }),
      apartmentPanel,
    );

    r360.renderToSurface(
      r360.createRoot('InfoPanel', { id: 'livingRoom',
                                     text: 'Stunning and Luxurious Living Room!'}),
      livingRoomPanel,
    );

    r360.renderToSurface(
      r360.createRoot('InfoPanel', { id: 'bedroom',
                                     text: 'The cozy and comfort place.'}),
      bedroomPanel,
    );

    r360.renderToSurface(
      r360.createRoot('InfoPanel', { id: 'kitchen',
                                     text: 'Enjoy and cook delicious meals at your personal restaurant.' }),
      kitchenPanel,
    );

    r360.detachRoot(introRoot);
  }
}


window.React360 = {init};