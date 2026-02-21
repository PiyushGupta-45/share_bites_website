import { useMemo, useState } from 'react';
import { Button, Card } from '../components/UI';

const steps = [
  'Capture donor images',
  'Temperature log',
  'Smell & texture inspection',
  'Allergen labels attached',
  'Waiver acknowledgement',
  'Handover OTP verification',
  'Photo verification',
];

export default function TrustSafetyPage() {
  const [completed, setCompleted] = useState({});

  const allDone = useMemo(() => steps.every((step) => completed[step]), [completed]);

  return (
    <div className="space-y-4">
      <Card>
        <h2 className="text-xl font-bold text-primary">Trust and Safety Checklist</h2>
        <div className="mt-3 space-y-2">
          {steps.map((step) => (
            <label key={step} className="flex items-center gap-2 rounded-xl border p-3 text-sm">
              <input
                type="checkbox"
                checked={Boolean(completed[step])}
                onChange={(e) => setCompleted((s) => ({ ...s, [step]: e.target.checked }))}
              />
              {step}
            </label>
          ))}
        </div>
      </Card>

      {allDone ? (
        <Card className="flex items-center justify-between">
          <p className="font-semibold text-green-700">Safety check complete. Pickup can start.</p>
          <Button>Start Pickup</Button>
        </Card>
      ) : null}
    </div>
  );
}
