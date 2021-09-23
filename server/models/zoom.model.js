const mongoose = require(mongoose);
const bcrypt = require('bcrypt');

const ZoomSchema = new mongoose.Schema(
    {
        topic: String,
        type: Number,
        start_time: String,
        duration: Number,
        schedule_for: String,
        timezone: String,
        password: String,
        agenda: String,
        recurrence: {
            type: Number,
            repeat_interval: Number,
            weekly_days: String,
            monthly_day: Number,
            monthly_week: Number,
            monthly_week_day: Number,
            end_times: Number,
            end_date_time: String
        },
        settings: {
            host_video: Boolean,
            participant_video: Boolean,
            cn_meeting: Boolean,
            in_meeting: Boolean,
            join_before_host: Boolean,
            mute_upon_entry: Boolean,
            watermark: Boolean,
            use_pmi: Boolean,
            approval_type: Number,
            registration_type: Number,
            audio: String,
            auto_recording: String,
            enforce_login: Boolean,
            enforce_login_domains: String,
            alternative_hosts: String,
            global_dial_in_countries: [
                String
            ],
            registrants_email_notification: Boolean
        }
    },
    { timestamps: true }
);


const Zoom = mongoose.model("Zoom", ZoomSchema);

// The mongoose model that lets you connect to it's DB collection.
module.exports = Zoom;
