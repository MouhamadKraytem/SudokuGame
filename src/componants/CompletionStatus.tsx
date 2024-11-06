import React from 'react'
import "./completionStatus.css";

type CompletionStatusProps = {
	isComplete: boolean;
};
export default function CompletionStatus(props: CompletionStatusProps) {
  return (
	  <div className="completion-status">
		  {props.isComplete ? (
			  <p className="complete-message">The board is complete!</p>
		  ) : (
			  <p className="incomplete-message">The board is not complete.</p>
		  )}
	  </div>
  )
}
