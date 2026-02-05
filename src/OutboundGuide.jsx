import React, { useState } from 'react';
import { AlertCircle, CheckCircle, XCircle, ChevronRight, ChevronDown, AlertTriangle } from 'lucide-react';

const OutboundGuide = () => {
  const [currentStep, setCurrentStep] = useState('initial');
  const [answers, setAnswers] = useState({});
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const reset = () => {
    setCurrentStep('initial');
    setAnswers({});
  };

  const renderInitial = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-400 to-green-500 p-8 rounded-lg text-white">
        <h1 className="text-3xl font-bold mb-3">Outbound Engagement Guide</h1>
        <p className="text-emerald-50 text-lg">Value-first, builder-focused outreach</p>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-amber-600 mt-0.5 flex-shrink-0" size={20} />
          <div>
            <h3 className="font-semibold text-amber-900 mb-1">Remember Our Foundation</h3>
            <p className="text-amber-800 text-sm">
              Supabase is product-led growth built for builders. Every outbound interaction must honor autonomy, 
              technical excellence, and respect for time. Low-quality outreach erodes the trust that differentiates us.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Before You Begin</h2>
        <p className="text-gray-700 mb-6">
          Start by asking yourself: <strong>What is my "Right to Engage"?</strong>
        </p>
        <button
          onClick={() => setCurrentStep('rightToEngage')}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          Start Qualification Check
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold mb-3 text-gray-900">Quick Reference</h3>
        <div className="space-y-2 text-sm">
          {[
            { label: 'Engagement Tiers', section: 'tiers' },
            { label: 'Research Framework', section: 'research' },
            { label: 'Communication Rules', section: 'comms' }
          ].map(item => (
            <div key={item.section}>
              <button
                onClick={() => toggleSection(item.section)}
                className="w-full flex items-center justify-between p-3 hover:bg-gray-100 rounded transition-colors"
              >
                <span className="font-medium text-gray-700">{item.label}</span>
                {expandedSections[item.section] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </button>
              {expandedSections[item.section] && (
                <div className="pl-3 pr-3 pb-3 text-gray-600">
                  {renderQuickReference(item.section)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderQuickReference = (section) => {
    const content = {
      tiers: (
        <ul className="space-y-2 list-disc pl-5">
          <li><strong>Tier 1:</strong> Product-Led Sales triggers (highest priority)</li>
          <li><strong>Tier 2:</strong> Install base engagement (existing users)</li>
          <li><strong>Tier 3:</strong> True outbound (requires external trigger + value alignment)</li>
          <li><strong>Tier 4:</strong> Social signals (strictest requirements)</li>
        </ul>
      ),
      research: (
        <ul className="space-y-2 list-disc pl-5">
          <li><strong>Step 1:</strong> Understand their Supabase usage patterns</li>
          <li><strong>Step 2:</strong> Research the individual's role and needs</li>
          <li><strong>Step 3:</strong> Research company context and prior interactions</li>
        </ul>
      ),
      comms: (
        <ul className="space-y-2 list-disc pl-5">
          <li>NO cold calling (only call if they provided their number)</li>
          <li>Maximum 3 touchpoints per contact within 15 days</li>
          <li>Email/LinkedIn and in-app are primary channels</li>
          <li>Messages must be concise, technical, action-oriented</li>
        </ul>
      )
    };
    return content[section];
  };

  const renderRightToEngage = () => (
    <div className="space-y-6">
      <button
        onClick={reset}
        className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1 mb-2"
      >
        ← Back to Start
      </button>

      <div className="bg-white border-2 border-emerald-500 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Mandatory Gate Check</h2>
        <p className="text-gray-600 mb-6">Answer these three critical questions before proceeding:</p>

        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 bg-emerald-500 text-white rounded-full text-sm font-bold">A</span>
              Can you explain the specific value in 1-2 sentences?
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              If you can't explain this clearly and concretely in Slack, you haven't earned the right to engage yet.
            </p>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setAnswers({ ...answers, valueExplained: true });
                  setCurrentStep('questionB');
                }}
                className="w-full text-left p-3 border-2 border-emerald-500 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors font-medium text-gray-900"
              >
                ✓ Yes, I can clearly articulate specific, customer-specific value
              </button>
              <button
                onClick={() => {
                  setAnswers({ ...answers, valueExplained: false });
                  setCurrentStep('noValue');
                }}
                className="w-full text-left p-3 border-2 border-gray-300 hover:border-gray-400 rounded-lg transition-colors text-gray-700"
              >
                ✗ No, I'm not sure or it's generic
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQuestionB = () => (
    <div className="space-y-6">
      <button
        onClick={() => setCurrentStep('rightToEngage')}
        className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1 mb-2"
      >
        ← Back
      </button>

      <div className="bg-white border-2 border-emerald-500 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Question B</h2>

        <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 bg-emerald-500 text-white rounded-full text-sm font-bold">B</span>
            Does the company/individual have an existing Supabase relationship?
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Check for relationships with: Executive, Investor, Board member, or Partner
          </p>
          <div className="space-y-2">
            <button
              onClick={() => {
                setAnswers({ ...answers, hasRelationship: true });
                setCurrentStep('existingRelationship');
              }}
              className="w-full text-left p-3 border-2 border-amber-500 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors font-medium text-gray-900"
            >
              ⚠ Yes, there is an existing executive-level relationship
            </button>
            <button
              onClick={() => {
                setAnswers({ ...answers, hasRelationship: false });
                setCurrentStep('questionC');
              }}
              className="w-full text-left p-3 border-2 border-emerald-500 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors font-medium text-gray-900"
            >
              ✓ No existing executive relationships
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQuestionC = () => (
    <div className="space-y-6">
      <button
        onClick={() => setCurrentStep('questionB')}
        className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1 mb-2"
      >
        ← Back
      </button>

      <div className="bg-white border-2 border-emerald-500 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Question C</h2>

        <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 bg-emerald-500 text-white rounded-full text-sm font-bold">C</span>
            Are you the appropriate person to engage?
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Should this be coordinated with or escalated to someone else?
          </p>
          <div className="space-y-2">
            <button
              onClick={() => {
                setAnswers({ ...answers, appropriatePerson: true });
                setCurrentStep('determineType');
              }}
              className="w-full text-left p-3 border-2 border-emerald-500 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors font-medium text-gray-900"
            >
              ✓ Yes, I'm the right person for this outreach
            </button>
            <button
              onClick={() => {
                setAnswers({ ...answers, appropriatePerson: false });
                setCurrentStep('coordinate');
              }}
              className="w-full text-left p-3 border-2 border-gray-300 hover:border-gray-400 rounded-lg transition-colors text-gray-700"
            >
              ✗ No, this should be coordinated or escalated
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNoValue = () => (
    <div className="space-y-6">
      <button
        onClick={reset}
        className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1 mb-2"
      >
        ← Start Over
      </button>

      <div className="bg-red-50 border-2 border-red-400 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <XCircle className="text-red-500 flex-shrink-0 mt-1" size={32} />
          <div>
            <h2 className="text-2xl font-bold text-red-900 mb-3">Do Not Engage</h2>
            <p className="text-red-800 mb-4">
              If you cannot identify specific, tangible value you will provide in the first interaction, 
              <strong> do not reach out</strong>.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Next Steps:</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 font-bold">•</span>
            <span>Post context in the sales channel for team input</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 font-bold">•</span>
            <span>Review the three-step research framework to find concrete value</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 font-bold">•</span>
            <span>Consider whether this prospect genuinely needs Supabase's help right now</span>
          </li>
        </ul>
      </div>

      <button
        onClick={reset}
        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors"
      >
        Start Over
      </button>
    </div>
  );

  const renderExistingRelationship = () => (
    <div className="space-y-6">
      <button
        onClick={() => setCurrentStep('questionB')}
        className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1 mb-2"
      >
        ← Back
      </button>

      <div className="bg-amber-50 border-2 border-amber-400 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <AlertTriangle className="text-amber-600 flex-shrink-0 mt-1" size={32} />
          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-3">Requires Approval</h2>
            <p className="text-amber-800 mb-4">
              This account has an existing executive-level relationship (CEO, founder, board, investor). 
              <strong> AE outbound requires explicit approval or coordination with the relationship owner.</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Required Actions:</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3 p-3 bg-gray-50 rounded">
            <span className="text-amber-500 font-bold text-xl">1</span>
            <span>Identify who owns the relationship (check company/org level tags)</span>
          </li>
          <li className="flex items-start gap-3 p-3 bg-gray-50 rounded">
            <span className="text-amber-500 font-bold text-xl">2</span>
            <span>Contact the relationship owner to coordinate</span>
          </li>
          <li className="flex items-start gap-3 p-3 bg-gray-50 rounded">
            <span className="text-amber-500 font-bold text-xl">3</span>
            <span>Get explicit approval before any outreach</span>
          </li>
        </ul>
        
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
          <p className="text-sm text-red-800 font-medium">
            ⛔ Any outreach to investors, VC firms, or investor-affiliated individuals is prohibited without 
            escalation to GTM leadership.
          </p>
        </div>
      </div>

      <button
        onClick={reset}
        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors"
      >
        Start Over
      </button>
    </div>
  );

  const renderCoordinate = () => (
    <div className="space-y-6">
      <button
        onClick={() => setCurrentStep('questionC')}
        className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1 mb-2"
      >
        ← Back
      </button>

      <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <AlertCircle className="text-blue-600 flex-shrink-0 mt-1" size={32} />
          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-3">Coordinate First</h2>
            <p className="text-blue-800 mb-4">
              Post context in the sales channel or escalate to leadership before proceeding with outreach.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-3">What to Include:</h3>
        <ul className="space-y-2 text-gray-700 list-disc pl-5">
          <li>Company/individual context</li>
          <li>The specific value you identified</li>
          <li>Why you think coordination is needed</li>
          <li>Your proposed approach</li>
        </ul>
      </div>

      <button
        onClick={reset}
        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors"
      >
        Start Over
      </button>
    </div>
  );

  const renderDetermineType = () => (
    <div className="space-y-6">
      <button
        onClick={() => setCurrentStep('questionC')}
        className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1 mb-2"
      >
        ← Back
      </button>

      <div className="bg-emerald-50 border-2 border-emerald-500 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <CheckCircle className="text-emerald-600 flex-shrink-0 mt-1" size={32} />
          <div>
            <h2 className="text-2xl font-bold text-emerald-900 mb-2">Gate Check Passed</h2>
            <p className="text-emerald-800">
              Now determine which engagement tier applies to proceed with research.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Select Engagement Type:</h3>
        <div className="space-y-3">
          <button
            onClick={() => setCurrentStep('tier1')}
            className="w-full text-left p-4 border-2 border-emerald-500 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
          >
            <div className="font-semibold text-gray-900 mb-1">Tier 1: Product-Led Sales Trigger</div>
            <p className="text-sm text-gray-600">Triggered by Supabase usage patterns or engagement behaviors</p>
          </button>
          <button
            onClick={() => setCurrentStep('tier2')}
            className="w-full text-left p-4 border-2 border-blue-400 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <div className="font-semibold text-gray-900 mb-1">Tier 2: Install Base Engagement</div>
            <p className="text-sm text-gray-600">Existing Supabase user who hasn't hit PLS triggers</p>
          </button>
          <button
            onClick={() => setCurrentStep('tier3')}
            className="w-full text-left p-4 border-2 border-purple-400 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
          >
            <div className="font-semibold text-gray-900 mb-1">Tier 3: True Outbound</div>
            <p className="text-sm text-gray-600">No Supabase footprint, requires external trigger + value alignment</p>
          </button>
          <button
            onClick={() => setCurrentStep('tier4')}
            className="w-full text-left p-4 border-2 border-amber-400 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors"
          >
            <div className="font-semibold text-gray-900 mb-1">Tier 4: Social Signal Outreach</div>
            <p className="text-sm text-gray-600">Triggered by LinkedIn post, conference appearance, etc.</p>
          </button>
        </div>
      </div>
    </div>
  );

  const renderTier = (tier, title, researchBar, requirements, examples, notes) => (
    <div className="space-y-6">
      <button
        onClick={() => setCurrentStep('determineType')}
        className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1 mb-2"
      >
        ← Back to Tier Selection
      </button>

      <div className={`border-2 rounded-lg p-6 ${
        tier === 1 ? 'bg-emerald-50 border-emerald-500' :
        tier === 2 ? 'bg-blue-50 border-blue-400' :
        tier === 3 ? 'bg-purple-50 border-purple-400' :
        'bg-amber-50 border-amber-400'
      }`}>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <div className="mt-4">
          <div className="text-sm font-medium text-gray-700 mb-2">Research Requirements:</div>
          <div className="bg-white rounded-full h-3 overflow-hidden border border-gray-300">
            <div 
              className={`h-full ${
                researchBar === 'low' ? 'bg-emerald-500 w-1/4' :
                researchBar === 'light' ? 'bg-blue-500 w-2/5' :
                researchBar === 'high' ? 'bg-purple-500 w-4/5' :
                'bg-amber-500 w-full'
              }`}
            />
          </div>
          <div className="text-xs text-gray-600 mt-1">{
            researchBar === 'low' ? 'Lower bar' :
            researchBar === 'light' ? 'Lighter requirements' :
            researchBar === 'high' ? 'Highest research bar' :
            'Strictest requirements'
          }</div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Research Checklist:</h3>
        <div className="space-y-3">
          {requirements.map((req, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded">
              <CheckCircle className="text-emerald-500 flex-shrink-0 mt-0.5" size={20} />
              <span className="text-gray-700">{req}</span>
            </div>
          ))}
        </div>
      </div>

      {examples && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Examples:</h3>
          <ul className="space-y-2 text-gray-700 list-disc pl-5">
            {examples.map((ex, idx) => (
              <li key={idx}>{ex}</li>
            ))}
          </ul>
        </div>
      )}

      {notes && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-blue-600 mt-0.5 flex-shrink-0" size={20} />
            <div className="text-sm text-blue-900">{notes}</div>
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Before Sending:</h3>
        <ul className="space-y-2 text-gray-700 list-disc pl-5 mb-4">
          <li>Message is concise, technically informed, and action-oriented</li>
          <li>References specific aspects of their usage/company context</li>
          <li>Demonstrates research quality</li>
          <li>Respects the 3 touchpoint / 15 day limit</li>
          <li>Using email, LinkedIn, or in-app (never cold calling)</li>
        </ul>
        <button
          onClick={reset}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          ✓ Ready to Engage
        </button>
      </div>

      <button
        onClick={reset}
        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors"
      >
        Start Over
      </button>
    </div>
  );

  const steps = {
    initial: renderInitial,
    rightToEngage: renderRightToEngage,
    questionB: renderQuestionB,
    questionC: renderQuestionC,
    noValue: renderNoValue,
    existingRelationship: renderExistingRelationship,
    coordinate: renderCoordinate,
    determineType: renderDetermineType,
    tier1: () => renderTier(
      1,
      "Tier 1: Product-Led Sales Trigger",
      "low",
      [
        "Review the specific PLS trigger that prompted this outreach",
        "Understand their Supabase usage patterns and feature adoption",
        "Identify scaling challenges or technical opportunities",
        "Research individual's role and how Supabase supports them"
      ],
      [
        "User hits paid tier threshold",
        "Rapid growth in database connections",
        "Feature adoption indicating readiness for upgrade",
        "Usage pattern showing technical bottleneck we can solve"
      ],
      "Primary focus area. These triggers indicate clear buying intent or technical milestones."
    ),
    tier2: () => renderTier(
      2,
      "Tier 2: Install Base Engagement",
      "light",
      [
        "Review all Supabase products and features in use",
        "Check usage trajectory and patterns",
        "Review support tickets and community activity",
        "Understand their role and typical needs",
        "Identify specific value opportunities"
      ],
      [
        "Free tier user who could benefit from paid features",
        "User with multiple independent team projects",
        "Account approaching limits who needs guidance"
      ],
      "Lighter research requirements since they've already chosen Supabase."
    ),
    tier3: () => renderTier(
      3,
      "Tier 3: True Outbound",
      "high",
      [
        "Identify tangible external trigger (job posting, tech blog, public roadmap, etc.)",
        "Research company type, business model, and tech stack",
        "Identify specific ways Supabase aligns with visible needs",
        "Research individual thoroughly - role, responsibilities, interests",
        "Verify no competitor/partner/investor conflicts",
        "Confirm product capabilities align with their compliance needs (if regulated industry)"
      ],
      [
        "Company posts Postgres engineering roles → offer to help scale infrastructure",
        "CTO writes about database challenges → offer architectural guidance",
        "Startup announces funding → help them scale properly from the start"
      ],
      "Highest research bar. Must have both external trigger AND clear value alignment. Generic outreach not permitted."
    ),
    tier4: () => renderTier(
      4,
      "Tier 4: Social Signal Outreach",
      "strictest",
      [
        "Verify individual has no existing Supabase exec relationships",
        "Confirm they don't work for competitor, partner, or investor",
        "Ensure social signal genuinely relates to challenges Supabase solves",
        "Research company and role thoroughly",
        "Identify concrete technical value you can provide",
        "Complete full research framework (usage, individual, company)"
      ],
      [
        "Developer tweets about Postgres migration challenges",
        "CTO presents at conference about infrastructure scaling",
        "Engineer writes blog post about real-time data problems"
      ],
      "⚠️ Strictest requirements. Enhanced due diligence required. Social activity alone isn't sufficient - must relate to genuine technical needs."
    )
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {steps[currentStep]()}
      </div>
    </div>
  );
};

export default OutboundGuide;