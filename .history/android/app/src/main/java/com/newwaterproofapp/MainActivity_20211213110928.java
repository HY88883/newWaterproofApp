package com.newwaterproofapp;

import com.facebook.react.ReactActivity;
import android.os.Bundle;
import com.fileopener.FileOpenerPackage;
public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "newWaterproofApp";
  }
  @Override
protected void onCreate(Bundle savedInstanceState) {
  super.onCreate(null);
}

@Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(), //<- Add comma
            new FileOpenerPackage() //<- Add package
        );
    }
}
