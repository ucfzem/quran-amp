package com.ucfzem.quranamp;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.goalplay.capacitormediasession.MediaSessionPlugin;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(MediaSessionPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
