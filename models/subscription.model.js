import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: 5,
        maxlength: 50,
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be positive'],
    },
    currency: {
        type: String,
        enum: ['EUR', 'USD', 'INR'],
        default: 'INR',
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'], // lowercase for easier logic
        default: 'weekly',
    },
    category: {
        type: String,
        enum: [
            'Sports',
            'News',
            'Entertainment',
            'Lifestyle',
            'Technology',
            'Finance',
            'Politics',
            'Other'
        ],
        required: [true, 'Category is required'],
    },
    paymentMethod: {
        type: String,
        required: [true, 'Payment method is required'],
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'canceled', 'expired'], // lowercase to match controller checks
        default: 'active',
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required'],
        validate: {
            validator: value => value <= new Date(),
            message: 'Start date must be in the past',
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return !this.startDate || value > this.startDate;
            },
            message: 'Renewal date must be after the start date',
        },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }
}, { timestamps: true });

// Auto-calculate renewal date & update status
subscriptionSchema.pre('save', function (next) {
    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }
    if (this.renewalDate < new Date()) {
        this.status = 'expired';
    }
    next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;
